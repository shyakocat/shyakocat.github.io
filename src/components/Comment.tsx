import Giscus from "@giscus/react";
import * as React from "react";

const id = "inject-comments";

// 获取 localStorage 中 theme 的值
function getSavedTheme() {
	return window.localStorage.getItem("theme");
}

// 获取系统主题
function getSystemTheme() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

function getCurrentTheme() {
	const theme = getSavedTheme();
	return theme === "dark" || theme === "light" ? theme : getSystemTheme();
}

const Comments = () => {
	const [mounted, setMounted] = React.useState(false);
	const [theme, setTheme] = React.useState("light");

	React.useEffect(() => {
		setTheme(getCurrentTheme());
		// 监听主题变化
		const observer = new MutationObserver(() => {
			setTheme(getCurrentTheme());
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});

		// 取消监听
		return () => {
			observer.disconnect();
		};
	}, []);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div id={id} className="w-full" style={{ height: "auto !important" }}>
			{mounted ? (
				<Giscus
					id={id}
					repo="shyakocat/shyakocat.github.io-comments"
					repoId="R_kgDOQywAvg"
					category="Announcements"
					categoryId="DIC_kwDOQywAvs4C0h6_"
					mapping="title"
					reactionsEnabled="1"
					emitMetadata="0"
					inputPosition="top"
					lang="zh-CN"
					loading="lazy"
					theme={theme}
				/>
			) : null}
		</div>
	);
};

export default Comments;
