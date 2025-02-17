export async function GET() {
  try {
      const response = await fetch(
          "https://data.tmd.go.th/api/WeatherToday/V2/?uid=api&ukey=api12345&format=json",
          { next: { revalidate: 60 } } // Cache 60 วิ ลดโหลดซ้ำ
      );

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
          status: 200,
      });

  } catch (error) {
      return new Response(JSON.stringify({ error: "API Error" }), {
          headers: { "Content-Type": "application/json" },
          status: 500,
      });
  }
}
