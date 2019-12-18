# cloudybadge

## An Interactive Attendee Badge Generator

### Operational Process

#### Phase 1A (DEFER)

1. Cloudinary Admin provisions an event (eg dev conference) on behalf of an organizer
1. Cloudinary Admin populates a database with personal info of registered attendees (RA)
1. Batch process generating EDIT and VIEW pages (obfuscated URLs) for each RA in database
1. Each RA receives their personal EDIT and VIEW pages URLs via email (no formal auth)

#### Phase 1B

1. RA uploads a photo to their EDIT page and interacting with image transformation(s)
1. RA submits the modified EDIT page which then generates a completed badge (VIEW page)
1. RA can share their VIEW page via the social media links included on their EDIT page

##### notes

- RA does not have control over the placement and resize of their photo overlay on badge
- RA can submit photos/transformations more than once, hence reset their VIEW page votes
- Example URL for EDIT and VIEW pages: cloudybadge.now.sh/RANDOMKEY (different keys)

#### Phase 2

1. VIEW pages are arranged in GALLERY page for voting by RAs (all or submitters only?)
1. RA votes on their one favorite badge (except their own, which would show grayed out)
1. RA votes are tallied on a LEADERBOARD page where highest voted RAs receive prizes

##### notes

- Gallery page shows a randomized order of VIEW pages to avoid bias due to fixed order
- Example URL for GALLERY page: cloudybadge.now.sh/RANDOMKEY (e.g. for HackBeforeXmas)

#### Phase 3 (DEFER)

1. RA can post notes to their EDIT page
1. RA can send messages to any other RA via their VIEW page

#### Personal Details on Badge

- First Name
- Last Name
- Title
- Company

#### Derived (Personal) Details on Badge

- QR Code (graphic generated from first name, last name, event name)
  Example - https://davidwalsh.name/create-qr-code (NodeJS library)

#### Badge Elements (non-personal, based on event)

- Badge image underlay (for event)
- Logo overlay (for event)
- Social media icons/links (Twitter, Facebook, LinkedIn, etc.)
- Optional attendee identifiers for social media links
- Useful links to event website, Cloudinary website, etc.

### Database Schema

- Collection name is 'badges' (in database 'cloudybadge' under root database 'cloudy')
- Columns: eventCode, firstName, lastName, title, company, editKey, viewKey,
  photoID, tranStr, voteID

#### notes

- editkey is the reference value for the record in the collection
- PhotoID is the ID of the asset in Cloudinary for the RA's uploaded photo
- Transfo encodes the photo transforms submitted by RA (null otherwise)
- VoteID is the editkey of the VIEW page voted by RA (null otherwise)

#### Flow Diagram

![CloudyBadge Flow](https://res.cloudinary.com/mayashavin/image/upload/v1576658640/cloudybadge/hackathon-cloudybadge.png)

### Implementation Stack

#### Frontend: TBD (Vue / Nuxt / Gridsome)

#### Backend: FaunaDB, Cloudinary (Serverless)

#### Deployment: Zeit Now (Serverless)

#### Other: QR Code Generator (Lib or API)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
