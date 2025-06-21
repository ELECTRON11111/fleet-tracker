This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
The Tech Stack is `Next Js` + `Tailwind CSS`.

## Live Application and Project Structure

Project Structure is shown below:
```
┌ src/
│  ├─ app/
│  │  ├─ layout.jsx
│  │  ├─ not-found.jsx
│  │  ├─ page.jsx
│  │  ├─ dashboard/
│  │  │   └─ page.jsx
│  │  └─ trucks/
│  │      ├─ page.jsx
│  │      └─ [truckId]/
│  │          └─ page.jsx
│  └─ components/
│      ├─ TruckMap.js
│      └─ TrucksChart.js
|      |_ TruckListItem.js
├ public/
│  └─ leaflet/
│      ├─ marker-icon.png
│      ├─ marker-icon-2x.png
│      └─ marker-shadow.png
├ package.json
├ next.config.js
└ ...
```

The live application URL is [Click Here To View App](https://fleet-tracker-seven.vercel.app/).

## Getting Started (Setting App up locally) 

1. Open command prompt or Git Bash and run this command locally to clone the repo on your local device.

```bash
git clone https://github.com/ELECTRON11111/fleet-tracker
```

2. Change directory into the cloned repository.

```bash
cd fleet-tracker
```

3. Install all node modules

```bash
npm install
# or
npm install --legacy-peer-deps
```

4. Now, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## API Usage

Truck data was fetched using an external mock API called Beeceptor.
The unique backend URL provided for my account is "https://omoniyiopemipo.free.beeceptor.com"
The trucks data is gotten under the `/trucks` API endpoint. Therefore the data is on [https://omoniyiopemipo.free.beeceptor.com/trucks](https://omoniyiopemipo.free.beeceptor.com/trucks).
It contains a total of 8 JSON data items of the format 

```
{
  "id": "TRK001",
  "driver": "John Doe",
  "status": "In Transit",
  "location": {
    "city": "Dallas",
    "lat": 32.7767,
    "lng": -96.7970
  }
}
```

## Dashboard Screenshots

* **For the /dashboard screen**

![Screenshot 2025-06-21 192709](https://github.com/user-attachments/assets/e828a589-ae76-4ea8-9476-e0140663c8dd)

Here, we have the fleet dashboard overview showing the *Total Count* of trucks, count of `In Transit` trucks, `maintenance` trucks, `Idle` trucks and *Average Idle time* in hours.
`Chart.js` was used to integrate the bar-chart showing a graphical view of overview data.

![Screenshot 2025-06-21 192730](https://github.com/user-attachments/assets/bd8e8558-6317-4f1e-8874-ee404631b53c)

The above screenshot shows the truck listing layout of data fetched from the API. It shows the truck Id, a color coded status, location and name of truck driver. It also has a status filter dropdown that filters between trucks by status `In Transit`, `Maintenance` or `Idle`. When a truck card is clicked, it takes the user to a truck details page where map and more location data is shown.


* **For the /trucks/[truckId] route (ticket-details-page)**

The screenshot below shows the layout for a truck that is "Idle" or on "Maintenance". For this status case, a blue marker is shown at the position where truck is located based on its longitude and latitude data using the `leaflet` Map Node Package.

![Screenshot 2025-06-21 193106](https://github.com/user-attachments/assets/fa62e4ce-49f3-4ee1-91c6-7306d4165fa2)

The screenshot below shows the layout for a truck that is "In Transit". That is, one that is currently on the move, its position is **updated live** as a simulation. The blue polyline shows its path; the point the polyline begins is the starting point and the marker represents its current position.

![Screenshot 2025-06-21 193028](https://github.com/user-attachments/assets/5f2b0613-3101-4491-ab14-3a91e59a9a30)

## known limitations

- There is a possibility of being rate limited by the mock API - it has a free tier of just 50 requests max per day.
- Chart Js and other similar modules for generating graphs causes some sort of unresponsiveness sometimes. It happens occasionally where it doesn't react quick.










