import axios from 'axios';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const province = searchParams.get('province');

        if (!province) {
            return new Response(JSON.stringify({ error: 'Missing province parameter' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 400,
            });
        }

        const apiKey = process.env.TMD_API_KEY;
        const urlDaily = `https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/place?province=${encodeURIComponent(province)}&fields=tc,rh,cond,tc_max,tc_min,ws10m&duration=7`;
        const urlHourly = `https://data.tmd.go.th/nwpapi/v1/forecast/location/hourly/place?province=${encodeURIComponent(province)}&fields=tc,rh,tc_max,cond&duration=24`;

        console.log('Fetching API:', urlDaily, urlHourly);
        console.log('API Key:', apiKey ? 'Loaded' : 'Not Found');

        //เรียก API ทั้งสองพร้อมกัน
        const [dailyResponse, hourlyResponse] = await Promise.all([
            axios.get(urlDaily, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            }),
            axios.get(urlHourly, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            })
        ]);

        console.log('API Response (Daily):', dailyResponse.data);
        console.log('API Response (Hourly):', hourlyResponse.data);

        //รวมข้อมูลทั้งสอง API
        const combinedData = {
            daily: dailyResponse.data,
            hourly: hourlyResponse.data
        };

        return new Response(JSON.stringify(combinedData), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (error) {
        console.error('API Error:', error.message);

        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
}
