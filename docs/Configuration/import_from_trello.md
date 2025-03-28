# Importing from Trello

Planka supports importing data from a single Trello board in JSON format. Here's how to do it:

## 1. Exporting from Trello:

First, you'll need to export your Trello board data as a JSON file. Head over to Trello's documentation for instructions on exporting data: [support.atlassian.com/trello/docs/exporting-data-from-trello/](https://support.atlassian.com/trello/docs/exporting-data-from-trello/).

## 2. Importing into Planka:

- Open a project in Planka.
- Create a new board and select a name.
- Click the Import button.
- Select Trello as the import source.
- Choose the downloaded JSON file from your computer.

Important Notes:

If you're running Planka without SSL encryption, Chrome might block access to your file system.
User information and attachments from Trello won't be imported during the Planka import process.
Currently, Planka can only import one checklist per card.

The default JSON export from Trello is limited to 1,000 actions.
Trello does not provide a warning if the JSON export is incomplete, so you will need to verify the JSON file yourself.
If you encounter this limitation, you will need to create your own JSON export using the [Trello REST API](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/).

## Looking for More Features?

If you need an import script with advanced features, check out these excellent community-made tools:
- [Import script with attachment transfer support](https://github.com/garpastyls/Trello_to_Planka_migration_script)
- [trello2planka](https://github.com/christophenne/trello2planka)
