export
  /**
   * Creates URL for the purpose of a schema.org ID from the parts
   *
   * @param {string} relativeUrl - The context relative to the base url, i.e. 'about/authors/john_doe/'.
   * @param {string} base - The base URL of the website, i.e. 'https://example.com/'.
   * @param {string} fragment - A url fragment the part including the '#' hash sign, i.e. '#breadcrumb'.
   * @returns {string} The URL as string.
   */
  function constructID (relative_url, base, fragment) {
		var url = new URL(relative_url, base);
	
		url.hash = fragment;
		return url.href; 
	}