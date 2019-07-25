// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async store => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api
    // const res = await axios.get('/.netlify/functions/fauna-graphql')
    // console.log(res)
    // const ratings = res.data.ratings
    // const contentType = store.addContentType({
    //   typeName: 'Ratings'
    // })

    // for (const item of ratings) {
      // contentType.addNode({
      //   title: "My First Post",
      //   data: "2019-07-09"
      // })
    // }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api
  })
}
