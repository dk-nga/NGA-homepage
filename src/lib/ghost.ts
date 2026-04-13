export interface GhostTag {
  id: string;
  name: string;
  slug: string;
}

export interface GhostAuthor {
  id: string;
  name: string;
  profile_image: string | null;
}

export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  published_at: string;
  reading_time: number;
  tags: GhostTag[];
  authors: GhostAuthor[];
}

export interface GhostPostsResponse {
  posts: GhostPost[];
  meta: {
    pagination: {
      page: number;
      limit: number;
      pages: number;
      total: number;
    };
  };
}

const GHOST_URL = "https://nextgenai.ghost.io";
const GHOST_KEY = "590ceca1738bc8daf927c30cfb";

const EMPTY_POSTS_RESPONSE: GhostPostsResponse = {
  posts: [],
  meta: { pagination: { page: 1, limit: 0, pages: 0, total: 0 } },
};

async function fetchGhost(params: Record<string, string>): Promise<GhostPostsResponse> {
  const searchParams = new URLSearchParams({
    key: GHOST_KEY,
    include: "tags,authors",
    ...params,
  });

  const url = `${GHOST_URL}/ghost/api/content/posts/?${searchParams.toString()}`;

  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Ghost API error: ${response.status}`);
  }

  return (await response.json()) as GhostPostsResponse;
}

export async function getGhostPosts(page = 1, limit = 12): Promise<GhostPostsResponse> {
  try {
    return await fetchGhost({ page: String(page), limit: String(limit) });
  } catch {
    return EMPTY_POSTS_RESPONSE;
  }
}

export async function getGhostPost(slug: string): Promise<GhostPost | null> {
  try {
    const response = await fetchGhost({ filter: `slug:${slug}`, limit: "1" });
    return response.posts[0] ?? null;
  } catch {
    return null;
  }
}
