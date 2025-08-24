/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2047001084")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_57myIciHnG` ON `guests` (\n  `email`,\n  `phone`\n)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2047001084")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
