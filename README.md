# Next.js-App-with-Django-and-docker
This project displays up to four different charts with data.
These charts include a candlestick chart, a line chart, a bar chart, and a pie chart.
The candlestick chart was done by using ApexCharts and the other charts were done by using ChartJS.

The chart's data was populated by calling on the Django API, which sends a JSON file with hardcoded data
in views.py. The URLs for each chart's API call is located in urls.py.

globals.css was used to help with dynamic resizing of the charts.

To run thie application via docker run these commands in the root directory:

docker-build
docker-up


To run this application, navigate to server/myproject and run:
python manage.py migrate

Then navigate to simple-nextjs-app-with-django and run:
npm run dev

Alternate:
You can also build and run as a static webpage instead using:

npm run build
npm start

or use the already built webpage by running:
npm start

My approach to this application was to first create the graph components and then add those to the page.
I hardcoded the data into the graph components first to make sure that they worked.
Originally, I was using ChartJS but there was no candlestick graph option so I installed ApexCharts to use for the candlestick graph.
Then I moved on to the backend and installed Django and setup the API and database.
Finally, I connected the frontend and backend by using a fetch call inside the graph components.
Once I had the major requirements done, I adjusted the components to make sure they dynamically rendered and put then in a four corners
square setup for viewing. Last but not least I added some color to the graphs so they looked more colorful and engaging, matching the Pie chart colors
to the labels.

As a bonus I used docker to build both the frontend and backend for easy deployment.