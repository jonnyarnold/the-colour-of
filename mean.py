from PIL import Image

def mean_colour(filename):
  """Returns the mean colour of the given image."""
  img = Image.open(filename)
  hist = img.histogram()
  red, green, blue = hist[:256], hist[256:512], hist[512:768] # Could be RGBA!
  if len(red) != len(blue):
    raise AssertionError("Image is not RGB (too many channels: %s %s %s)" % (len(red), len(green), len(blue)))

  return [mean_index(red), mean_index(green), mean_index(blue)]

def mean_index(lst):
  """Returns the index of the mean value"""
  return sum(v*i for v,i in enumerate(lst)) / sum(lst)

if __name__ == '__main__':
  print(mean_colour('Test.png'))
