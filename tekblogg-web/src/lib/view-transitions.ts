/** Transition type added when the category filter changes the post list. */
export const FILTER_POSTS_TRANSITION = "filter-posts";

/** Shared-element names linking a post card to its post page. */
export const postImageTransitionName = (slug: string | null) =>
  `post-image-${slug}`;
export const postTitleTransitionName = (slug: string | null) =>
  `post-title-${slug}`;
