# Shopware 6 Webpack configuration to use in the Production Template
The Production Template does not support JavaScript compilation in custom themes or plugins. With
this Webpack configuration, you can overcome this.

## Installation
- Copy the following files / folders to your plugin folder `src/Resources/app/storefront`:
    - `build/` (including its 2 files)
    - `package.json`
- Navigate into that folder and run `yarn install`.
- Create a new file `build.json` with the following contents:

```json
{
    "outputFilename": "swag-example.js"
}
```

Here, `swag-example` needs to name your plugin name, converted from camelCase into kebab-case.

## Usage
Run either `yarn build` or `yarn watch`. This should generate a `dist/` folder in your plugin folder. Run `bin/console theme:compile` to see if the resulting JavaScript file is picked up correctly.

## Caveats
If your plugin is not located in `custom/plugins`, you possibly need to modify the constant `shopwareRoot`.

