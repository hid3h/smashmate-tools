export const revalidate = 30;

import Image from "next/image";
import parse from "node-html-parser";

export default async function Home({ params }: { params: { id: string } }) {
  const userId = params.id;
  console.log("取得開始. userId:", userId);
  const response = await fetch(`https://smashmate.net/user/${userId}`);
  console.log(response.headers);
  const body = await response.text();
  const root = await parse(body);
  const h2List = root.querySelectorAll("h2");
  const rateNode = h2List.find((h2) => {
    return h2.text === "レーティング対戦履歴";
  });
  if (!rateNode) {
    console.log("レーティング対戦履歴が見つかりませんでした. userId:", userId);
    return <div></div>;
  }
  const rateLinkElement = rateNode.parentNode
    ?.querySelectorAll("a")
    .find((a) => {
      return a.getAttribute("href")?.includes("/rate/");
    });
  if (!rateLinkElement) {
    console.log(
      "レーティング対戦履歴のリンク要素が見つかりませんでした. userId:",
      userId
    );
    return <div></div>;
  }
  const href = rateLinkElement.getAttribute("href");
  if (!href) {
    console.log(
      "レーティング対戦履歴のリンクが見つかりませんでした. userId:",
      userId
    );
    return <div></div>;
  }

  // レーティング対戦詳細ページから情報を取得
  const rateResponse = await fetch(href);
  const rateBody = await rateResponse.text();
  const rateRoot = await parse(rateBody);
  // 対戦相手の名前, キャラ画像URL, レートを取得sla
  const opponentDiv = rateRoot.querySelectorAll("h2").find((h2) => {
    if (!h2.text.includes("プレイヤー")) {
      return false;
    }
    const userLinkElement = h2.parentNode?.querySelector("a");
    if (!userLinkElement) {
      return false;
    }
    const userLink = userLinkElement.getAttribute("href");
    const include = userLink?.includes(userId);
    return !include;
  })?.parentNode;
  const opponentName = opponentDiv?.querySelector("a")?.text;
  const opponentCharacterImageUrl = opponentDiv
    ?.querySelectorAll("img")[1]
    ?.getAttribute("src");
  const opponentRate = opponentDiv?.querySelector("span")?.text;

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col text-4xl gap-3">
      <p>{opponentName}</p>
      {opponentCharacterImageUrl && (
        <Image
          src={opponentCharacterImageUrl}
          alt="キャラクター画像"
          width={60}
          height={60}
        />
      )}
      <p>{opponentRate}</p>
    </div>
  );
}
