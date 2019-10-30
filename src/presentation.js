// Import React
import React, { useState, useEffect, useRef } from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Code,
  Text,
  Layout,
  Link,
  ComponentPlayground,
  S,
  Image
} from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";
import styled, { css } from "styled-components";
// Require CSS
require("normalize.css");

const theme = createTheme(
  {
    primary: "#262626",
    secondary: "white",
    tertiary: "#03A9FC",
    quaternary: "#CECECE"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

const EasingsContainer = styled.div`
  --box-size: 100px;
  --transition-distance: 20em;
  position: relative;
`;

const Box = styled.div`
  width: var(--box-size);
  height: var(--box-size);
  background-color: #7b506f;
  transition: transform 1500ms ${props => props.easing};

  ${props =>
    props.going &&
    css`
      transform: translateX(var(--transition-distance));
    `}
`;

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 1em;
`;

const BoxDescription = styled.span`
  color: white;
  text-align: left;
  transition: opacity 250ms;
  padding: 1em;

  ${props =>
    props.hide &&
    css`
      opacity: 0;
    `}
`;

const Button = styled.button`
  text-transform: uppercase;
  font-size: 0.7em;
  color: white;
  background-color: #5398be;
  border-radius: 10px;
  border: none;
  width: 7.5em;
  height: 2.5em;
  outline: none;
  cursor: pointer;
`;

const Delimeter = styled.div`
  position: absolute;
  top: 0;
  left: calc(var(--box-size) + 1em + var(--transition-distance));
  border-right: 5px dashed #5398be;
  height: 100%;
  transition: opacity 500ms;
  opacity: 0.7;
  ${props =>
    props.hidden &&
    css`
      opacity: 0;
    `}
`;

const DescriptedBox = ({ going, hideDescription, easing, onTransitionEnd }) => {
  return (
    <BoxContainer>
      <Box going={going} easing={easing} onTransitionEnd={onTransitionEnd} />
      <BoxDescription hide={hideDescription}>{easing}</BoxDescription>
    </BoxContainer>
  );
};

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Indicator = styled.div`
  padding: 0.25em;
  font-family: apple color emoji, segoe ui emoji, noto color emoji,
    android emoji, emojisymbols, emojione mozilla, twemoji mozilla,
    segoe ui symbol;
`;

const Easings = () => {
  const states = ["initial", "going", "retreat"];
  const [going, setGoing] = useState(states[0]);

  return (
    <EasingsContainer>
      <DescriptedBox
        easing="linear"
        going={going === states[1]}
        hideDescription={going !== states[0]}
        onTransitionEnd={() =>
          going === states[1]
            ? setTimeout(() => setGoing(states[2]), 500)
            : setGoing(states[0])
        }
      />
      <DescriptedBox
        easing="ease-in-out"
        going={going === states[1]}
        hideDescription={going !== states[0]}
      />
      <DescriptedBox
        easing="cubic-bezier(0.18, 0.89, 0.32, 1.28)"
        going={going === states[1]}
        hideDescription={going !== states[0]}
      />
      <Delimeter hidden={going !== states[1]} />
      <Controls>
        <Button onClick={() => setGoing(states[1])}>Start</Button>
        <Indicator>
          {going === states[1] ? "▶" : states[2] === going ? "◀" : "⏸️"}
        </Indicator>
      </Controls>
    </EasingsContainer>
  );
};

const ListItemWithBefore = styled(ListItem)`
  display: flex;
  margin: 0.5em;
  &:before {
    content: "${props => props.stress}";
    min-width: 14em;
    display: list-item;
    font-weight: bold;
  };


`;

const ListItemIndent = styled.span`
  display: inline-block;

  &:first-line {
    padding-left: 0em;
  }
`;

const Item = ({ stress, content }) => (
  <ListItemWithBefore
    stress={stress + (content !== undefined ? ":" : "")}
    textSize="1em"
  >
    <ListItemIndent>{content}</ListItemIndent>
  </ListItemWithBefore>
);

const CustomCode = styled.p`
  font-family: monospace;
  margin: 0.25rem auto;
  background-color: rgba(0, 0, 0, 0.15);
  padding: 0 10px;
  border-radius: 3px;
  color: white;
  font-size: 1em;

  ${props =>
    props.noBg &&
    css`
      background-color: unset;
    `}
  ${props =>
    props.multi &&
    css`
      margin: 0;
      display: block;
      text-align: left;
      width: fit-content;
    `}
`;

const Accent = styled.span`
  color: #4b92e2;

  ${props =>
    props.ord2 &&
    css`
      color: #fdca40;
    `}

  ${props =>
    props.ord3 &&
    css`
      color: #f79824;
    `}
`;

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={["zoom", "slide"]}
        transitionDuration={500}
        theme={theme}
      >
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Transitions
          </Heading>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <div className="container">
            <div className="header">
              <img src="./header.png" alt="header" />
            </div>
            <div className="pumpkin">
              <img src="./pumpkin.png" alt="Pumpkin" />
            </div>
          </div>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={6} textColor="secondary" caps>
            Was stellen wir euch vor?
          </Heading>
          <List style={{ listStylePosition: "outside" }}>
            <ListItem margin="0.75em">Was sind Transitions?</ListItem>
            <ListItem margin="0.75em">Funktion und Zweck</ListItem>
            <ListItem margin="0.75em">Syntax</ListItem>
            <ListItem margin="0.75em">Easings</ListItem>
            <ListItem margin="0.75em">Beispiele</ListItem>
            <ListItem margin="0.75em">User Experience</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={6} textColor="secondary" caps>
            Was sind Transitions?
          </Heading>
          <Image src="transition-flow.svg" />
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={6} textColor="secondary" caps>
            Was sind Transitions?
          </Heading>
          <List style={{ listStylePosition: "outside" }}>
            <ListItem margin="0.75em">
              Sanfte Übergänge von CSS-Zuständen
            </ListItem>
            <ListItem margin="0.75em">
              Zwischenzustände werden automatisch interpoliert
            </ListItem>
            <ListItem margin="0.75em">
              <strong>Daher:</strong> Übergänge werden "kontrolliert
              verlangsamt"
            </ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={6} textColor="secondary" caps>
            Syntax
          </Heading>
          <Text textColor="secondary" textSize="0.8em" margin="1em">
            Shorthand:
          </Text>
          <Layout>
            <CustomCode
              children={`
              transition: <property> <duration> <timing-function> <delay>;
              `}
            ></CustomCode>
          </Layout>
          <Text textColor="secondary" textSize="0.8em" margin="1em">
            Ausführlich:
          </Text>
          <Layout>
            <CustomCode children="transition-property: <property>;"></CustomCode>
          </Layout>
          <Layout>
            <CustomCode children="transition-duration: <duration>;"></CustomCode>
          </Layout>
          <Layout>
            <CustomCode children="transition-timing-function: <timing-function>;"></CustomCode>
          </Layout>
          <Layout>
            <CustomCode children="transition-delay: <delay>;"></CustomCode>
          </Layout>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={6} textColor="secondary" caps>
            Syntax
          </Heading>
          <Text textColor="secondary" textSize="0.8em" margin="1em">
            Shorthand:
          </Text>
          <Layout>
            <CustomCode>
              transition: <Accent>transform .5s ease-in-out 1s</Accent>;
            </CustomCode>
          </Layout>
          <Text textColor="secondary" textSize="0.8em" margin="1em">
            Ausführlich:
          </Text>
          <Layout>
            <CustomCode>
              transition-property: <Accent>transform</Accent>;
            </CustomCode>
          </Layout>
          <Layout>
            <CustomCode>
              transition-duration: <Accent>.5s</Accent>;
            </CustomCode>
          </Layout>
          <Layout>
            <CustomCode>
              transition-timing-function: <Accent>ease-in-out</Accent>;
            </CustomCode>
          </Layout>
          <Layout>
            <CustomCode>
              transition-delay: <Accent>1s</Accent>;
            </CustomCode>
          </Layout>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={6} textColor="secondary" caps>
            Syntax
          </Heading>
          <Text textColor="secondary" textSize="0.8em" margin="1em">
            Auf alle Eigenschaften:
          </Text>
          <CustomCode>
            transition: <Accent>all .5s</Accent>;
          </CustomCode>
          <Text textColor="secondary" textSize="0.8em" margin="1em">
            Auf mehrere Eigenschaften:
          </Text>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              backgroundColor: "rgba(0, 0, 0, 0.15)"
            }}
          >
            <CustomCode noBg style={{ margin: 0 }}>
              transition:
            </CustomCode>
            <CustomCode noBg multi>
              <Accent>transform .5s ease-in-out 1s</Accent>,
              <br />
              <Accent ord2>color .5s ease-in 1s</Accent>,
              <br />
              <Accent ord3>background-color .5s ease-out 1s</Accent>;
            </CustomCode>
          </span>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={6} textColor="secondary" caps>
            Live Beispiel
          </Heading>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={6} textColor="secondary" caps>
            Easings
          </Heading>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Easings />
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <List style={{ listStylePosition: "outside" }}>
            <Item stress="linear" content="gleichförmige Bewegung" />
            <Item
              stress="ease-in"
              content="startet
              langsam, endet abrupt"
            />
            <Item
              stress="ease-out"
              content="startet
              abrupt, endet langsam"
            />
            <Item
              stress="ease-in-out"
              content="startet
              und endet langsam"
            />
            <Item stress="..." />
            <Item
              stress="cubic-bezier(x1, y1, x2, y2)"
              content="selbst definierte Bézierkurve"
            />
          </List>
        </Slide>
        <Slide bgColor="#e5eefa">
          <Image src="./cubic-bezier.gif" />
        </Slide>
        <Slide bgColor="#e5eefa">
          <Heading size={6} textColor="#4b92e2" caps>
            Zum Festhalten
          </Heading>
          <List textColor="#4b92e2" style={{ listStylePosition: "outside" }}>
            <ListItem margin="1em">
              Bei einer Bézierkurve wird die Bewegung auf die Zeit aufgetragen
              (x-Achse)
            </ListItem>
            <ListItem margin="1em">
              Lineare Easing [cubic-bezier(0,0,1,1)] kann in vielen Fällen
              langweilig wirken
            </ListItem>
            <ListItem margin="1em">
              <strong>Faustregel:</strong> Easings sollten umgekehrt genutzt
              werden, d.h. ease-in für velassende Elemente
            </ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="secondary">
          <Heading size={6} textColor="secondary" caps>
            Beispiele
          </Heading>
        </Slide>
        <Slide transition={["fade"]} bgColor="#e5eefa" textColor="secondary">
          <Heading size={6} textColor="#4b92e2" caps>
            User Experience
          </Heading>
        </Slide>
        <Slide bgColor="#e5eefa">
          <Image src="./transition-speed.gif" />
        </Slide>
        <Slide bgColor="#e5eefa">
          <Heading size={6} textColor="#4b92e2" caps>
            Die richtige Dauer
          </Heading>
          <List textColor="#4b92e2" style={{ listStylePosition: "outside" }}>
            <ListItem margin="1em" textSize="1em">
              Etwa 200-500ms
            </ListItem>
            <ListItem margin="1em" textSize="1em">
              Computer <strong>></strong> Wearables <strong>></strong>{" "}
              Smartphones <strong>></strong> Tablets
              <br />
              (schnell zu langsam)
            </ListItem>
            <ListItem margin="1em">
              <strong>unter 100ms</strong> fallen nicht auf
            </ListItem>
            <ListItem margin="1em">
              <strong>über 1000ms</strong> wirken langweilig
            </ListItem>
          </List>
        </Slide>
        <Slide bgColor="#e5eefa">
          <Image src="./ux-good-bad.gif" />
        </Slide>
        <Slide bgColor="#e5eefa">
          <BlockQuote>
            <Quote textColor="#4b92e2">
              the interface should reflect the movements that we know from the
              physical world
            </Quote>
            <Cite>Taras Skytskyi</Cite>
          </BlockQuote>
        </Slide>
        <Slide bgColor="#e5eefa">
          <Heading size={6} textColor="#4b92e2" caps>
            Inhalte ausblenden
          </Heading>
          <video
            width="450px"
            src="./ux-content-before-container.mp4"
            autoPlay
            loop
          ></video>
        </Slide>
        <Slide bgColor="#e5eefa">
          <Heading size={6} textColor="#4b92e2" caps>
            Zum Festhalten
          </Heading>
          <List textColor="#4b92e2" style={{ listStylePosition: "outside" }}>
            <ListItem margin="1em" textSize="1em">
              <strong>Wirkt oft Wunder:</strong>{" "}
              <Code textColor="white">transition: all 150ms;</Code>
            </ListItem>
            <ListItem margin="1em" textSize="1em">
              Transitions nicht zu langsam ablaufen lassen
            </ListItem>
            <ListItem margin="1em" textSize="1em">
              Transition sollte unaufdringlich und nicht ablenkend sein
            </ListItem>
            <ListItem margin="1em" textSize="1em">
              <strong>Jedoch: </strong>
              Möchte man die bewusste Aufmerksamkeit des Benutzers, müssen diese
              Regeln nicht eingehalten werden
            </ListItem>
          </List>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Habt ihr noch Fragen?
          </Heading>
        </Slide>
        <Slide bgColor="primary">
          <Heading size={6} textColor="secondary" caps>
            Quellen
          </Heading>
          <List textColor="secondary" style={{ listStylePosition: "outside" }}>
            <ListItem margin="1em" textSize="1em">
              <Link
                href="https://developer.mozilla.org/de/docs/Web/CSS/transition"
                children="https://developer.mozilla.org/de/docs/Web/CSS/transition"
              />
            </ListItem>
            <ListItem margin="1em" textSize="1em">
              <Link
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties"
                children="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties"
              />
            </ListItem>
            <ListItem margin="1em" textSize="1em">
              <Link
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function"
                children="https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function"
              />
            </ListItem>
            <ListItem margin="1em" textSize="1em">
              <Link
                href="https://uxdesign.cc/the-ultimate-guide-to-proper-use-of-animation-in-ux-10bd98614fa9"
                children="https://uxdesign.cc/the-ultimate-guide-to-proper-use-of-animation-in-ux-10bd98614fa9"
              />
            </ListItem>
            <ListItem margin="1em" textSize="1em">
              <Link
                href="https://twitter.com/dsenneff/status/1171784107619160064"
                children="https://twitter.com/dsenneff/status/1171784107619160064"
              />
            </ListItem>
          </List>
          <Text textColor="secondary" textSize="0.8em" margin="1em">
            (abgerufen am 30.10.2019)
          </Text>
          <Text textColor="secondary" textSize="0.8em" margin="1em">
            - Niklas Schikora, Calvin Reibenspieß
          </Text>
        </Slide>
      </Deck>
    );
  }
}
