import { NextResponse } from 'next/server';
import axios from 'axios';

const WIKIPEDIA_API_URL = 'https://en.wikipedia.org/w/api.php';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');
  const category = searchParams.get('category');
  const title = searchParams.get('title');

  try {
    if (action === 'random' && category) {
      // Fetch random pages within a category
      const response = await axios.get(WIKIPEDIA_API_URL, {
        params: {
          action: 'query',
          format: 'json',
          list: 'random',
          rnnamespace: 0,
          rnlimit: 2, // Fetch two random pages
        },
      });

      const randomPages = response.data.query.random.map((page: any) => page.title);
      return NextResponse.json({ randomPages });
    }

    if (title) {
      // Fetch specific page content and links with redirect handling
      const response = await axios.get(WIKIPEDIA_API_URL, {
        params: {
          action: 'parse',
          page: title,
          redirects: 1, // Enable redirects
          format: 'json',
          origin: '*',
        },
      });

      if (response.data?.parse?.text) {
        const html = response.data.parse.text['*'];
        const links = html.match(/<a[^>]+href="\/wiki\/[^"]+"[^>]*>/g) || [];
        const linkTitles = links.map((link: string) =>
          link.match(/href="\/wiki\/([^"]+)"/)?.[1]?.replace(/_/g, ' ')
        );

        return NextResponse.json({ html, links: linkTitles });
      } else {
        return NextResponse.json(
          { error: `Failed to fetch page: ${title}` },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Invalid request. Specify a valid action or title parameter.' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in API handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
