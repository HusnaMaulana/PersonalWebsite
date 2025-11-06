import { blob } from "@/lib/blob";

export default function Head() {
	return (
		<>
			<link
				rel="preload"
				as="image"
				href={blob("/citypop/citypop_skyline_far.png")}
			/>
			<link
				rel="preload"
				as="image"
				href={blob("/citypop/citypop_street_mid.png")}
			/>
			<link
				rel="preload"
				as="image"
				href={blob("/citypop/citypop_palm_near.png")}
			/>
			<link rel="preload" as="audio" href="/audio/BGM.mp3" />
		</>
	);
}
