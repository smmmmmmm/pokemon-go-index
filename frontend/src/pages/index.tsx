import Head from "next/head";
import Router from "next/router";

import {
  Button,
  CircularProgress,
  Divider,
  Heading,
  Image,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

import { useAllPokemonsGet } from "@/features/pokemons";
import { useLogin, useLogout, useUser } from "@/features/users";
import { publicURL } from "@/utils/config";

const Top = () => {
  const { user, setUser, userLoading } = useUser();
  const login = useLogin();
  const logout = useLogout();

  // login 後にポケモンデータを preload しておく
  const enable = !!user;
  const { isLoading } = useAllPokemonsGet(enable);
  const isPokemonPreLoading = enable && isLoading;

  return (
    <>
      <Head>
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:title" content="PokemonGoIndex" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="hoge" />
        <meta
          property="og:image"
          content={publicURL("logo/OGPTitleLogo.png")}
        />
      </Head>
      <VStack overflow="auto" w="100%" h="100%" pt="60px" spacing={10}>
        <Image w="80%" alt="title logo" src={"/logo/TitleLogo.png"} />
        {userLoading || isPokemonPreLoading ? (
          <>
            <CircularProgress color="green.300" isIndeterminate />
          </>
        ) : (
          <>
            {!user && (
              <Button
                w="80%"
                h="80px"
                leftIcon={<FcGoogle size={20} />}
                onClick={(e) => login()}
              >
                <Text fontSize={"15pt"}>SignUp/In By Google</Text>
              </Button>
            )}
            {user && (
              <>
                <Button
                  w="80%"
                  h="80px"
                  onClick={(e) => Router.push(`my-pokedex`)}
                >
                  <VStack w="100%">
                    <Text fontSize={"15pt"}>Go to your pokedex</Text>
                    <Text color={"gray.800"} fontSize={"10pt"}>
                      user: {user.email}
                    </Text>
                  </VStack>
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    setUser(null);
                    logout();
                  }}
                >
                  logOut
                </Button>
              </>
            )}
          </>
        )}
        <Divider />
        <>
          本サイトはポケモンGOのポケモンの図鑑を管理することを目的とした Web
          アプリケーションです
        </>
        <Heading as="h2" size="md">
          注意事項
        </Heading>
        <UnorderedList>
          <ListItem>
            現状でも一応使えますが，開発中のため予告なくデータが消滅したりサービスが終了したり接続が安定しなかったりする可能性があります，予めご了承下さい
          </ListItem>
          <ListItem>
            イベントデータなどは作者が手動で入れるため，最新でなかったり間違っている可能性があります．正確な情報は公式
            Twitter などをご確認下さい
          </ListItem>
          <ListItem>
            アクセス時に読み込みに数秒~10数秒程度かかることがあります.
            またリロードなどをするとキャッシュが消えて再度読み込みが発生するためご注意下さい
          </ListItem>
        </UnorderedList>

        <Heading as="h2" size="md">
          コンテンツについて
        </Heading>
        <UnorderedList>
          <ListItem>
            本サイト上の「Pokemon」および「PokemonGo」に関する全てのコンテンツの著作権および商標権を含む知的財産権は,
            当該コンテンツの提供元に帰属します.
          </ListItem>
          <ListItem>
            本サイトは「Niantic サービス利用規約 5.
            コンテンツ及びコンテンツに関する権利」に基づいて非営利なユーザーコンテンツとして作成しております
          </ListItem>
        </UnorderedList>

        <Heading as="h2" size="md">
          その他
        </Heading>
        <UnorderedList>
          <ListItem>
            ポケモンの画像データなど一部の情報は
            <Link
              color="teal.500"
              href="https://pokemon-go-api.github.io/pokemon-go-api/"
            >
              {" "}
              Pokemon GO API{" "}
            </Link>
            から取得したデータを利用しています.
          </ListItem>
          <ListItem>
            その他細かい情報は
            <Link
              color="teal.500"
              href="https://github.com/simamumu/pokemon-go-index"
            >
              {" "}
              README.md{" "}
            </Link>
            をご確認下さい. フロント周りのコードも同 Repository
            上に概ね公開されています
          </ListItem>
          <ListItem>
            本サイトに関する問い合わせ先 : pokemon.go.index.web@gmail.com
          </ListItem>
        </UnorderedList>
      </VStack>
    </>
  );
};

export default Top;
