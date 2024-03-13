# Carbon Intensity Great Britain

In this project, you can explore the carbon intensity in Great Britain to gain insights into electricity production patterns. By understanding the carbon intensity of the electricity we use, we can make informed decisions about our energy consumption, contributing to the fight against climate change.

> <b>What is Carbon Intensity?</b><br>
> Carbon intensity measures the cleanliness of our electricity. It indicates the amount of carbon dioxide (CO2) emitted to produce a kilowatt-hour (kWh) of electricity.

## Main Features
- An overview dashboard displays today's data and forecasted data. Users can customize their layout by dragging and dropping cards.
- Search functionality for accessing historical data and gaining deeper insights.
- Implementation of an authentication router guard to control access to specific pages based on user authentication status.
  - The accounts to login:
    | username    | password |
    | -------- | ------- |
    | atuny0  | 9uQFF1Lh    |
    | hbingley1 | CQutx25i8r    
    | rshawe2    | OWsTbMUgFc    |

## APIs
- [Carbon Intensity API](https://carbon-intensity.github.io/api-definitions/?javascript#carbon-intensity-api-v2-0-0)
- [dummyJSON](https://dummyjson.com/): for mock authentication
          
## Tech Stack
<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original-wordmark.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/d3js/d3js-original.svg" width="50" />         
</div>

- [Pinia](https://pinia.vuejs.org/)
- [Vue Grid Layout](https://jbaysolutions.github.io/vue-grid-layout/)

## References
- [How to integrate Vue Grid Layout with Nuxt.js?](https://github.com/jbaysolutions/vue-grid-layout/issues/230#issuecomment-1137344752) by g-tejas
- [Authentication in Nuxt 3](https://dev.to/rafaelmagalhaes/authentication-in-nuxt-3-375o) by Rafael Magalhaes

## Topics to Explore in Depth
- [Why it have to set the value to `null` to help D3.js render charts correctly?](https://github.com/12cassie34/carbon-intensity-great-britain/blob/a03ea10e9981bedba99484fca0889937be0aee68/pages/search-historical-data.vue#L16)

## Rabbit Holes
- `props` can not be destructed, or it will loose their reactivity.







