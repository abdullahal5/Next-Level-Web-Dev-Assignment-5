import { Typography } from "antd";

const { Title } = Typography;

const Titlebar = ({ title }: { title: string }) => {
  return (
    <Title style={{ textAlign: "center", padding: "30px 0px" }} level={2}>
      {title}
    </Title>
  );
};

export default Titlebar;
