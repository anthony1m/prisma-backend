function requestValue(req, fieldName) {
  const bodyValue = req.body?.[fieldName];

  if (bodyValue !== undefined && bodyValue !== null && String(bodyValue).trim()) {
    return bodyValue;
  }

  return req.query?.[fieldName];
}

function imageURL(req) {
  if (req.file) {
    return `/uploads/${req.file.filename}`;
  }

  const value = requestValue(req, "imageURL");

  if (value) {
    const imageValue = Array.isArray(value) ? value[0] : value;
    return normalizeImageURL(imageValue);
  }

  throw new Error("Image is required. Send image as a file or imageURL as text.");
}

function normalizeImageURL(value) {
  const url = String(value).trim();

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return url.startsWith("/") ? url : `/uploads/${url}`;
}

function splitImageURLValues(value) {
  const values = Array.isArray(value) ? value : [value];

  return values.flatMap((item) =>
    String(item)
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean)
  );
}

function imageURLs(req) {
  if (req.file) {
    return [`/uploads/${req.file.filename}`];
  }

  const value = requestValue(req, "imageURL");
  const values = splitImageURLValues(value);

  const urls = values
    .filter((value) => value && String(value).trim())
    .map(normalizeImageURL);

  if (!urls.length) {
    throw new Error("Image is required. Send image as a file or imageURL as text.");
  }

  return urls;
}

function optionalImageURL(req) {
  if (req.file) {
    return `/uploads/${req.file.filename}`;
  }

  const value = requestValue(req, "imageURL");

  if (value) {
    const imageValue = Array.isArray(value) ? value[0] : value;
    return normalizeImageURL(imageValue);
  }

  return null;
}

function pageId(req) {
  const id = Number(requestValue(req, "pageId"));

  if (!Number.isInteger(id)) {
    throw new Error("pageId is required and must be a number.");
  }

  return id;
}

function optionalPageId(req) {
  const value = requestValue(req, "pageId");

  if (!value) {
    return undefined;
  }

  const id = Number(value);

  if (!Number.isInteger(id)) {
    throw new Error("pageId must be a number.");
  }

  return id;
}

function text(req, fieldName) {
  const value = requestValue(req, fieldName);

  if (!value || !String(value).trim()) {
    throw new Error(`${fieldName} is required.`);
  }

  return String(value).trim();
}

function optionalText(req, fieldName) {
  const value = requestValue(req, fieldName);

  if (!value || !String(value).trim()) {
    return null;
  }

  return String(value).trim();
}

module.exports = {
  imageURL,
  imageURLs,
  optionalImageURL,
  optionalPageId,
  optionalText,
  pageId,
  splitImageURLValues,
  text,
};
