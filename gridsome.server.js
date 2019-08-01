// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async store => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api
    const res = await axios.get("/.netlify/functions/fauna-graphql")
    const ratings = res.data.ratings ? res.data.ratings : [
      {
        "ref": {
          "@ref": {
            "id": "237354363876540929",
            "collection": {
              "@ref": {
                "id": "ratings",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1562701064205000,
        "data": {
          "place": "Luke's Lobster Back Bay",
          "rating": 5
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "237356916766933517",
            "collection": {
              "@ref": {
                "id": "ratings",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1562701077680000,
        "data": {
          "place": "Neptune Oyster",
          "rating": 4
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "237359551053038083",
            "collection": {
              "@ref": {
                "id": "ratings",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1562622557620000,
        "data": {
          "place": "Yankee Lobster",
          "rating": 3
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "237359554887680515",
            "collection": {
              "@ref": {
                "id": "ratings",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1562701079600000,
        "data": {
          "place": "Yankee Lobster",
          "rating": 3.5
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "237359576378245645",
            "collection": {
              "@ref": {
                "id": "ratings",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1562622581760000,
        "data": {
          "place": "Luke's Lobster Downtown Crossing",
          "rating": 3
        }
      }
    ]
    const contentType = store.addContentType({
      typeName: 'Ratings'
    })

    for (const item of ratings) {
      contentType.addNode({
        ref: item.ref["@ref"].id,
        place: item.data.place,
        rating: item.data.rating
      })
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api
  })
}
