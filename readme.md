# Recopick - backend

## For Frontend Repository [Click Here](https://github.com/amirulkanak/recopick-product-review)

## Description
A Product Recommendation platform for recommending products.

## Installation
### Prerequisites
- Node.js (>=16.x)
- npm or yarn

### Dependencies
- cookie-parser
- cors
- dotenv
- express
- jsonwebtoken
- mongodb
- nodemon

### Setup
1. Clone the repository
```bash
git clone https://github.com/amirulkanak/recopick-product-review-backend.git
```
2. Install dependencies
```bash
npm install
```
3. Create a `.env` file in the root directory and add the following environment variables
```env
MONGODB_URI=<Your MongoDB URI>
MONGODB_DB=<Database Name>
JWT_SECRET=<Your JWT Secret>
FRONTEND_URLS=<Comma-separated list of allowed frontend URLs>
```
4. Start the server
```bash
npm run dev
# or 
npm start
```