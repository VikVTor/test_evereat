const { createClient } = require('@supabase/supabase-js');

const main = async () => {
	const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhibHJ5anNseWZpZHdmbGh1dm5jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMTM4MTYzNSwiZXhwIjoyMDE2OTU3NjM1fQ.6ORMqjWy4ioe6LZ7IzZREbw9_ZKXsqm1X9ET00pbjXA'
	const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhibHJ5anNseWZpZHdmbGh1dm5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzODE2MzUsImV4cCI6MjAxNjk1NzYzNX0.EEiso7Dc9OhgSmIa9Kwyh79zSWmMigWR_YK_UnyKqrE'

	const supabase = createClient('https://xblryjslyfidwflhuvnc.supabase.co', SERVICE_KEY);

	// let { data, error } = await supabase
	// 	.from('restaurant')
	// 	.select(`
	// 		*,
	// 		menu (
	// 			*,
	// 			dish (
	// 				*,
	// 				variant (*)
	// 			)
	// 		),
	// 		reviews (
	// 			*,
	// 			"user" (*)
	// 		)
	// `);

	let {data, error} = await supabase
        .from('user')
        .delete(`*`)
		.eq('name', 'Marchino');

	console.log(error ? error : data);
}

main();