import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch
} from 'sanity-codegen'

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch
}

/**
 * Post
 *
 *
 */
export interface Post extends SanityDocument {
  _type: 'post'

  /**
   * Title — `string`
   *
   *
   */
  title: string

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: 'slug'; current: string }

  /**
   * Authors — `array`
   *
   *
   */
  authors: Array<SanityKeyedReference<Author>>

  /**
   * Categories — `array`
   *
   *
   */
  categories: Array<SanityKeyedReference<Category>>

  /**
   * Published at — `datetime`
   *
   *
   */
  publishedAt: string

  /**
   * Introduction — `postIntroduction`
   *
   *
   */
  introduction: PostIntroduction

  /**
   * Main image — `image`
   *
   *
   */
  mainImage: {
    _type: 'image'
    asset: SanityReference<SanityImageAsset>
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot
    alt?: string
    title?: string
  }

  /**
   * Body — `blockContent`
   *
   *
   */
  body: BlockContent
}

/**
 * Author
 *
 *
 */
export interface Author extends SanityDocument {
  _type: 'author'

  /**
   * Name — `string`
   *
   *
   */
  name: string

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: 'slug'; current: string }

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: 'image'
    asset: SanityReference<SanityImageAsset>
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot
    alt?: string
    title?: string
  }

  /**
   * Bio — `array`
   *
   *
   */
  bio?: Array<SanityKeyed<SanityBlock>>
}

/**
 * Category
 *
 *
 */
export interface Category extends SanityDocument {
  _type: 'category'

  /**
   * Title — `string`
   *
   *
   */
  title: string

  /**
   * Description — `text`
   *
   *
   */
  description?: string
}

export type PostIntroduction = Array<SanityKeyed<SanityBlock>>

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: 'image'
      asset: SanityReference<SanityImageAsset>
      crop?: SanityImageCrop
      hotspot?: SanityImageHotspot
    }>
  | SanityKeyed<Code>
>

export type Documents = Post | Author | Category

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Code = any
