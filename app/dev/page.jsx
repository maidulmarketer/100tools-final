import Badge from "@/components/badges/Badge";
import Button from "@/components/buttons/Button";
import ToolCard from "@/components/cards/ToolCard";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import Container from "@/components/wrappers/Container";

export default function DevPage() {
  return (
    <Container className="space-y-6">
      <h1>COMPONENTS</h1>
      <ThemeSwitcher />
      <section
        id="buttons"
        className="p-4 rounded-lg border border-odtheme/10 space-y-4"
      >
        <h2>Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="primary">Primary Button</Button>
          <Button variant="text">Text Button</Button>
          <Button variant="dynamic">Dynamic Button</Button>
          <Button variant="dynamicOutlined">Dynamic Outlined Button</Button>
          <Button variant="light">Light Button</Button>
          <Button variant="dark">Dark Button</Button>
          <Button variant="success">Success Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="secondaryOutlined">Secondary Outlined Button</Button>
        </div>
      </section>

      <section
        id="badges"
        className="p-4 rounded-lg border border-odtheme/10 space-y-4"
      >
        <h2>Badges</h2>
        <div className="flex gap-4 flex-wrap">
          <Badge variant="primary">Primary badge</Badge>
          <Badge variant="warning">Warning badge</Badge>
          <Badge variant="success">Success badge</Badge>
          <Badge variant="danger">Danger badge</Badge>
          <Badge variant="dynamic">Dynamic badge</Badge>
          <Badge variant="successTransparent">Success transparent</Badge>
          <Badge variant="dangerTransparent">Danger transparent</Badge>
          <Badge variant="warningTransparent">Warning transparent</Badge>
          <Badge variant="semiWarningTransparent">
            Semi Warning transparent
          </Badge>
        </div>
      </section>

      {/* <section
        id="cards"
        className="p-4 rounded-lg border border-odtheme/10 space-y-4"
      >
        <h2>Tool Cards</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <ToolCard featured brandNew />
          <ToolCard editorsChoice brandNew />
          <ToolCard editorsChoice />
          <ToolCard brandNew />
          <ToolCard />
        </div>
      </section> */}
    </Container>
  );
}
