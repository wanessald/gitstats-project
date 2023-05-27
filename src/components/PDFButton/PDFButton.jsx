import { PDFDownloadLink, Document, Page, Text, View, Image, Line } from "@react-pdf/renderer";

export const PDFButton = ({ userData, repos, selectedRepo }) => {
  const topRepos = repos.slice(0, 3);

  return (
    <PDFDownloadLink style={{textDecoration:"none", color:"white"}}
      document={
        <MyDocument
          userData={userData}
          repos={topRepos}
          selectedRepo={selectedRepo}
        />
      }
      fileName={userData.name}
    >
      {({ blob, url, loading, error }) =>
        loading ? "Gerando PDF..." : "Baixar PDF"
      }
    </PDFDownloadLink>
  );
};

const MyDocument = ({ userData, repos, selectedRepo }) => (
  <Document>
    <Page style={{ padding: "5%", backgroundColor:"#1E1E1E", color:"#D9D9D9"}}>
      <Image style={{ width: "30%", borderRadius: "50%", marginLeft: "35%" }} src={userData.avatar_url} />
      <Text style={{ fontSize: 24, textAlign: "center", marginTop: 4 }}>{userData.name}</Text>
      <Text style={{ fontSize: 10, textAlign: "center", fontStyle: "italic" }}>{userData.email}</Text>
      <Text style={{ fontSize: 15, textAlign: "center", margin: 5 }}>{userData.bio}</Text>
      <Text style={{ fontSize: 10, textAlign: "center", fontStyle: "italic" }}>From {userData.location}</Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30}}>
      <Text style={{ fontSize: 15, margin: 8 }}>Últimas Atualizações:</Text>
        <Text style={{ fontSize: 15, margin: 8 }}>Total de Repositórios: {userData.public_repos}</Text>
      </View>

      {repos.map((repo) => (
        <View key={repo.id} style={{ fontSize: 15, lineHeight: 1.4, textAlign: "justify", margin: 8 }}>
          <Text style={{fontWeight: "bold" , backgroundColor:"#D9D9D9", padding:"3", borderRadius:"5", color:"black", marginBottom:"3"}}>Título: {repo.name}</Text>
          <Text >Linguagem: {repo.language}</Text>
          <Text>Atualização: {Intl.DateTimeFormat("pt-br").format(new Date(repo.updated_at))}</Text>
          <Text>Criação: {Intl.DateTimeFormat("pt-br").format(new Date(repo.created_at))}</Text>
          <Text>Nº Forks: {repo.forks}</Text>
          <Text>Nº Estrelas: {repo.stargazers_count}</Text>
          <Line />
        </View>
      ))}
    </Page>
  </Document>
);
