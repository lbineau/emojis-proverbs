import { Octokit } from '@octokit/rest'
import { createHash, timingSafeEqual } from 'crypto'

const OWNER = 'lbineau'
const REPO = 'emojis-provers'
const FILE_PATH = 'src/assets/quotes.json'
const BASE_BRANCH = 'main'

function sha256(plain) {
  return createHash('sha256').update(plain).digest('hex')
}

export default async (request) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const { passwordHash, emojis, quote, link } = await request.json()

  const adminPassword = process.env.ADMIN_PASSWORD?.trim()
  if (!adminPassword || !passwordHash) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const expectedHash = sha256(adminPassword)
  const receivedBuffer = Buffer.from(String(passwordHash))
  const expectedBuffer = Buffer.from(expectedHash)
  if (receivedBuffer.length !== expectedBuffer.length || !timingSafeEqual(receivedBuffer, expectedBuffer)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (!emojis || !quote || !link) {
    return new Response(JSON.stringify({ error: 'Missing required fields: emojis, quote, link' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return new Response(JSON.stringify({ error: 'Server configuration error: missing GitHub token' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const octokit = new Octokit({ auth: token })

  try {
    // 1. Get current quotes.json content and SHA from main branch
    const { data: fileData } = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
      ref: BASE_BRANCH
    })

    const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8')
    const quotesJson = JSON.parse(currentContent)

    // 2. Append new entry
    quotesJson.quotes.push({ emojis, quote, link })

    const updatedContent = JSON.stringify(quotesJson, null, 4) + '\n'

    // 3. Get the SHA of the main branch HEAD to create a new branch from it
    const { data: refData } = await octokit.git.getRef({
      owner: OWNER,
      repo: REPO,
      ref: `heads/${BASE_BRANCH}`
    })
    const mainSha = refData.object.sha

    // 4. Create a new branch
    const branchName = `add-expression-${Date.now()}`
    await octokit.git.createRef({
      owner: OWNER,
      repo: REPO,
      ref: `refs/heads/${branchName}`,
      sha: mainSha
    })

    // 5. Commit updated quotes.json to the new branch
    await octokit.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
      message: `Add expression: ${quote}`,
      content: Buffer.from(updatedContent).toString('base64'),
      sha: fileData.sha,
      branch: branchName
    })

    // 6. Create a pull request
    const { data: prData } = await octokit.pulls.create({
      owner: OWNER,
      repo: REPO,
      title: `Add expression: ${quote}`,
      head: branchName,
      base: BASE_BRANCH,
      body: `## New Expremoji\n\n| Field | Value |\n|-------|-------|\n| Emojis | ${emojis} |\n| Expression | ${quote} |\n| Link | ${link} |\n\n---\n*Created from the backoffice admin form*`
    })

    return new Response(JSON.stringify({ url: prData.html_url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('GitHub API error:', error)
    return new Response(JSON.stringify({ error: error.message || 'Failed to create PR' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export const config = {
  path: '/.netlify/functions/create-pr'
}
