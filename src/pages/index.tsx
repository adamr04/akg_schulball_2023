import * as React from "react";
import { graphql, Link } from "gatsby";
import { INode, PageProps } from "@/definitions";
import { Layout, ArticleCard, Container, Hero, Seo } from "@/components";
import cover from "@/images/cover.png";

const Home: React.FC<PageProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMdx.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Der 45. Schulball des Akademischen Gymnasiums Wien" />
      <Hero
        title="OSCARNACHT"
        date="17. Mai 2024"
        location="Palais Ferstel"
        video
      >

        <p>
          Unser nächster Maturaball findet am 17. Mai 2024 im Palais Ferstel zum Thema "Oscarnacht" statt.<br></br> <br></br>
          Wir freuen uns auf ein zahlreiches Kommen und auf ein Wiedersehen 2024.<br></br> <br></br>

          Liebe Ballgäste, <br></br>
          <a href="https://drive.google.com/drive/folders/10ExneqG1h-kI22Z3G9hnD8LhSlr-F1rh?usp=share_link">hier der Link zu den Ballfotos 2023.</a> <br></br>
          Viel Freude damit! <br></br>
          Herzliche Grüße, <br></br>
          Ihr Schulball-Komitee 2023/24
        </p>

        {/* <iframe width="420" height="315" class="center" src="https://www.youtube.com/embed/urJgFAeO2xw"> </iframe> */}

        {/*
        <div className="action">
          <Link to="/reservation">Karten reservieren</Link>
        </div>
  */}

      </Hero>
      <Container>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {posts.map(({ node }: { node: INode }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <li key={node.fields.slug} className="group">
                <ArticleCard
                  link={node.fields.slug}
                  title={title}
                  description={node.frontmatter.description}
                  tags={node.frontmatter.tags}
                />
              </li>
            );
          })}
        </ol>
      </Container>
    </Layout>
  );
};

export default Home;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { frontmatter: { type: { eq: "article" } } }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            order
            title
            description
            tags
          }
        }
      }
    }
  }
`;
