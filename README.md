## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ayan7walker/DriveClone.git
cd DriveClone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the app

```bash
node app.js
```

App will run on `http://localhost:3000`

## Usage

1. Register a new account at `/user/register`
2. Login at `/user/login`
3. Upload, view, and delete your files at `/files`

## Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |

## Author

**Md. Ayan Ansari** — [@ayan7walker](https://github.com/ayan7walker)

> Full Stack Developer | Founder StayIntegral.in
