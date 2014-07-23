function submitForm(event)
{
  event.preventDefault() // Ensure form is not submitted

  setLoadingState()

  // Generate file request
  var file = document.getElementById("upload").files[0]
  var formData = new FormData()
  formData.append('upload', file, file.name)

  // jQuery complains about invalid TypeErrors for FormData,
  // so we resort to plain-old XHRs.
  var request = new XMLHttpRequest()
  request.open('POST', '/upload', true)
  request.onload = function() {
    try {
      if(request.status === 200) {
        unsetLoadingState()
        updateSiteWith(JSON.parse(request.responseText))
      } else {
        throw "Error"
      }
    } catch(e) {
      alert('We can\'t process this file right now. Sorry!')
    }
  }
  
  request.send(formData)
}

function setLoadingState() {
  $('#status').css('visibility', 'visible')
  $('#submit').attr('disabled', true)
  $('#upload').attr('disabled', true)
}

function unsetLoadingState() {
  $('#status').css('visibility', 'hidden')
  $('#submit').removeAttr('disabled')
  $('#upload').removeAttr('disabled')
}

function updateSiteWith(colourData) {
  $('#title').html('The colour of your file is <span class=\'colour\'>' + colourData.name + '</span>')

  var cssRgb = 'rgb(' + colourData.rgb.join(',') + ')'
  $('#splash-outer').css('background-color', cssRgb)
}

$(document).ready(function() {
  $('#file-upload').on('submit', submitForm);

  var hue = Math.floor(Math.random() * 360)
  var cssHsl = 'hsl(' + hue + ',50%, 50%)'
  $('#splash-outer').css('background-color', cssHsl)
})
