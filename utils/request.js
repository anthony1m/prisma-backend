function imageURL(req) {
  if (req.file) {
    return `/uploads/${req.file.filename}`;
  }

  if (req.body.imageURL) {
    const url = String(req.body.imageURL).trim();
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    return url.startsWith("/") ? url : `/uploads/${url}`;
  }

  throw new Error("Image is required. Send image as a file or imageURL as text.");
}

function optionalImageURL(req) {
  if (req.file) {
    return `/uploads/${req.file.filename}`;
  }

  if (req.body.imageURL) {
    const url = String(req.body.imageURL).trim();
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    return url.startsWith("/") ? url : `/uploads/${url}`;
  }

  return null;
}

function pageId(req) {
  const id = Number(req.body?.pageId);

  if (!Number.isInteger(id)) {
    throw new Error("pageId is required and must be a number.");
  }

  return id;
}

function text(req, fieldName) {
  const value = req.body?.[fieldName];

  if (!value || !String(value).trim()) {
    throw new Error(`${fieldName} is required.`);
  }

  return String(value).trim();
}

function optionalText(req, fieldName) {
  const value = req.body?.[fieldName];

  if (!value || !String(value).trim()) {
    return null;
  }

  return String(value).trim();
}

module.exports = {
  imageURL,
  optionalImageURL,
  optionalText,
  pageId,
  text,
};
