export function getError(errors) {
  if (errors.url.type === "not_found") {
    return "Did not find any data with that link :(";
  } else if (errors.url.type === "required") {
    return "This field is required";
  } else {
    return "Unknown error";
  }
}
