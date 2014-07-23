from bottle import get, post, static_file, request, run
from mean import mean_colour
from colours import colour_name

STATIC_FILETYPES = ['.js', '.css']

@get('/upload')
def show_upload():
  return static_file('index.html', root='.')

@post('/upload')
def get_image_info():
  uploaded_file = request.files.get('upload')
  colour = mean_colour(uploaded_file.file)
  return {'rgb': colour, 'name': colour_name(colour)}

@get('/:path')
def static(path):
  if not any([path.endswith(ft) for ft in STATIC_FILETYPES]):
    raise StandardError("Cannot get file " + path + " because its extension is not in the list of static file types")

  return static_file(path, root='.')

run()
