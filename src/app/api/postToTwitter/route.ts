import { NextResponse } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';

export async function GET(request: Request) {
    try {
        // 解析查询参数
        const url = new URL(request.url);
        const tweet = url.searchParams.get('content');

        if (!tweet) {
            return NextResponse.json({ error: 'No tweet content provided' }, { status: 400 });
        }

        // 初始化 Twitter 客户端
        const client = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY!,
            appSecret: process.env.TWITTER_API_SECRET!,
            accessToken: process.env.TWITTER_ACCESS_TOKEN!,
            accessSecret: process.env.TWITTER_ACCESS_SECRET!,
        });

        // 发布推文
        const { data } = await client.v2.tweet(tweet);

        console.log('Tweet Result:', data);

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Failed to fetch data:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}