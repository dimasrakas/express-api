enum HttpStatusCode {

  /**
     * Standard response for successful HTTP requests.
     * The actual response will depend on the request method used.
     * In a GET request, the response will contain an entity corresponding to the requested resource.
     * In a POST request, the response will contain an entity describing or containing the result of the action.
     */
  OK = 200,

  /**
   * The request has been fulfilled, resulting in the creation of a new resource.
   */
  CREATED = 201,

  /**
   * The server cannot or will not process the request due to an apparent client error
   * (e.g., malformed request syntax, too large size, invalid request message framing, or deceptive request routing).
   */
  BAD_REQUEST = 400,

  /**
      * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet
      * been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the
      * requested resource. See Basic access authentication and Digest access authentication. 401 semantically means
      * "unauthenticated",i.e. the user does not have the necessary credentials.
      */
  UNAUTHORIZED = 401,

  /**
   * The request was valid, but the server is refusing action.
   * The user might not have the necessary permissions for a resource.
   */
  FORBIDDEN = 403,

  /**
      * The requested resource could not be found but may be available in the future.
      * Subsequent requests by the client are permissible.
      */
  NOT_FOUND = 404,
}

export default HttpStatusCode
