function submitForm(event)
{
  event.preventDefault() // Ensure form is not submitted

  // TODO: Loading display

  // Generate file request
  var file = document.getElementById("upload").files[0]
  var formData = new FormData()
  formData.append('upload', file, file.name)

  // jQuery complains about invalid TypeErrors for FormData,
  // so we resort to plain-old XHRs.
  var request = new XMLHttpRequest()
  request.open('POST', '/upload', true)
  request.onload = function() {
    if(request.status === 200) {
      // TODO: Remove loading display
      updateSiteWith(JSON.parse(request.responseText))
    } else {
      alert('We can\'t process this file. Sorry!')
    }
  }
  
  request.send(formData)
}

function updateSiteWith(colourData) {
  $('#title').html('The colour of your file is <span class=\'colour\'>' + colourData.name + '</span>')

  var cssRgb = 'rgb(' + colourData.rgb.join(',') + ')'
  $('#splash-outer').css('background-color', cssRgb)
}

$(document).ready(function() {
  $('#file-upload').on('submit', submitForm);
})
