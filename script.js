function getUrlId() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  return id
}

document
  .getElementById('sendDataButton')
  .addEventListener('click', function () {
    sendRequest(true)
  })

document.getElementById('noDataButton').addEventListener('click', function () {
  sendRequest(false)
})

async function sendRequest(isAccepted) {
  document.getElementById('loading').classList.remove('hidden')
  document.getElementById('loading').classList.add('flex')
  const id = getUrlId()

  const apiUrl = `https://vtiqh72o4qwrxpozujf5y5amue0nycqi.lambda-url.ap-southeast-1.on.aws/consent/${id}?status=${isAccepted}`
  // const apiUrl = `https://n5oaentcunoyxlvs47glfwq3si0otkad.lambda-url.ap-southeast-1.on.aws/consent/${id}?status=${isAccepted}`
  try {
    let res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('res', res)
    if (!res.ok) {
      document.getElementById('loading').classList.add('hidden')
      document.getElementById('consentBox').classList.add('hidden')
      document.getElementById('sendDataButton').classList.add('hidden')
      document.getElementById('noDataButton').classList.add('hidden')
      document.getElementById('responseError').classList.remove('hidden')
      document.getElementById('responseError').classList.add('flex')
      return
    }
    document.getElementById('loading').classList.remove('flex')
    document.getElementById('loading').classList.add('hidden')
    document.getElementById('consentBox').classList.add('hidden')
    document.getElementById('responseError').classList.add('hidden')
    document.getElementById('sendDataButton').classList.add('hidden')
    document.getElementById('noDataButton').classList.add('hidden')
    if (isAccepted) {
      document.getElementById('acceptConsent').classList.remove('hidden')
      document.getElementById('acceptConsent').classList.add('flex')
      document.getElementById('noAcceptConsent').classList.add('hidden')
      document.getElementById('consentBox').classList.remove('flex')
    } else {
      document.getElementById('noAcceptConsent').classList.remove('hidden')
      document.getElementById('noAcceptConsent').classList.add('flex')
      document.getElementById('acceptConsent').classList.add('hidden')
      document.getElementById('consentBox').classList.remove('flex')
    }
  } catch (error) {
    console.error('Error:', error)
    document.getElementById('responseError').classList.remove('hidden')
    document.getElementById('responseError').classList.add('flex')
    document.getElementById('noDataButton').classList.add('hidden')
    document.getElementById('sendDataButton').classList.add('hidden')
    document.getElementById('consentBox').classList.add('hidden')
    document.getElementById('loading').classList.remove('flex')
    document.getElementById('loading').classList.add('hidden')
  }
  document.getElementById('loading').classList.remove('flex')
  document.getElementById('loading').classList.add('hidden')
}
document.addEventListener('DOMContentLoaded', function () {
  const sendDataButton = document.getElementById('sendDataButton')
  const noDataButton = document.getElementById('noDataButton')

  function checkScrollAndEnableButtons() {
    const isScrolledToBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    const hasNoScroll = document.body.scrollHeight <= window.innerHeight

    if (isScrolledToBottom || hasNoScroll) {
      sendDataButton.disabled = false
      noDataButton.disabled = false

      sendDataButton.classList.remove('opacity-50', 'cursor-not-allowed')
      noDataButton.classList.remove('opacity-50', 'cursor-not-allowed')
    }
  }
  checkScrollAndEnableButtons()
  document.addEventListener('scroll', checkScrollAndEnableButtons)
})
