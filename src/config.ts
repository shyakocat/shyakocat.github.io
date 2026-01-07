import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
	// UmamiConfig,
	// UmamiStatsConfig,
	FriendLink,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "shyakocatの博客",
	subtitle: "The niece of time.",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: false,
		src: "assets/images/demo-banner.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		// {
		//   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		LinkPreset.Friends,
		// {
		// 	name: "友链",
		// 	url: "/links/", // Internal links should not include the base path, as it is automatically added
		// 	external: false, // Show an external link icon and will open in a new tab
		// },
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "/fll.jpeg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "shyakocat",
	bio: "The niece of time.",
	links: [
		{
			name: "Wordpress",
			icon: "fa6-brands:wordpress", // Visit https://icones.js.org/ for icon codes
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://shyakocatblog.wordpress.com/",
		},
		{
			name: "Zhihu",
			icon: "fa6-brands:zhihu",
			url: "https://www.zhihu.com/people/shyakocat",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/shyakocat",
		},
		{
			name: "RSS",
			icon: "fa6-solid:rss",
			url: "/rss.xml",
		}
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};


export const friendLinks: FriendLink[] = [
  {
    name: "buaa-shy",
    url: "https://www.cnblogs.com/buaa-shy",
    description: "螃蟹在剥我的壳，笔记本在写我，漫天的我落在枫叶上雪花上，而你在想我",
    avatar: "/20200330201449_bktsj.jpg",
  },
];