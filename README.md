# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Running Locally

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add your keys. You can get these from your Supabase project dashboard and Google AI Studio.
    ```
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    GEMINI_API_KEY=your_google_ai_api_key
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Deployment

This project is optimized for deployment on modern serverless platforms like Netlify or Vercel.

### Deploying to Netlify

1.  **Push your code to a Git repository** (e.g., GitHub, GitLab).

2.  **Create a new site on Netlify** and connect it to your Git repository.

3.  **Configure Environment Variables:**
    In your Netlify site dashboard, go to **Site configuration > Environment variables**. Add the following variables:
    - `NEXT_PUBLIC_SUPABASE_URL`: Your public Supabase URL.
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your public Supabase anonymous key.
    - `GEMINI_API_KEY`: Your API key for Google AI.

4.  **Trigger Deployment:**
    Netlify will automatically detect the `netlify.toml` file, use the correct build settings (`npm run build`), and deploy your site. Any new push to your main branch will trigger a new deployment.

You're all set! Once deployed, Netlify will provide you with a live URL for your application.