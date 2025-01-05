// lib/wikipedia.ts
export const fetchPageContentAndLinks = async (page: string) => {
  try {
    const response = await axios.get(WIKIPEDIA_API_URL, {
      params: {
        action: 'query',
        format: 'json',
        prop: 'extracts|links',
        explaintext: 1,
        titles: page,
        redirects: 1,
        plnamespace: 0,
        pllimit: 100,
        origin: '*',
      },
    });

    const pages = response.data.query.pages;
    const pageId = Object.keys(pages)[0];
    const content = pages[pageId]?.extract || 'No content available';
    const links = pages[pageId]?.links?.map((link: any) => link.title) || [];

    return { content, links };
  } catch (error) {
    console.error('Error fetching page content and links:', error);
    throw error;
  }
};
