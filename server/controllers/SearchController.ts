import SearchServiceFactory from "../factories/SearchServiceFactory";

class SearchController {
  constructor() {}

  async search(req, res, service) {
    let searchService;
    const { text, type } = req.body;
    const token = req.user.linkedAccounts[service]
      ? req.user.linkedAccounts[service]
      : null;
    console.log(req.user);
    console.log("TOKEN: " + token);

    if (token) {
      searchService = SearchServiceFactory.getService(
        service,
        token,
        type,
        text
      );
    }

    try {
      const results = await searchService.search();
      console.log("Search results: " + results);
      res.status(200).send({ results: results });
    } catch (err) {
      res.status(500).send({ error: "An error occured trying to search" });
      console.log(err);
    }
  }
}

export default new SearchController();
