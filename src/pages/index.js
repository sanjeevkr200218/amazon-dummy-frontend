import Head from "next/head";
import Layout from "@/components/Layout";
import Banner from "@/components/Banner";
import ProductFeed from "@/components/ProductFeed";
export default function Home({ products }) {
  return (
    <>
      <div className="bg-grey-100">
        <Head>
          <title>Amazon</title>
          <meta name="description" content="Amazon clone" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Layout>
          <main className="max-w-screen-2xl mx-auto pt-32">
            <Banner />
            {/* Product Feed */}
            <ProductFeed products={products} />
          </main>
        </Layout>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    props: {
      products,
    },
  };
}
