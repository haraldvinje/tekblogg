import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'jbq2yq78',
  dataset: 'production',
  apiVersion: 'v2021-10-21',
  useCdn: true
})
