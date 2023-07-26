import LightSVG from "@/components/projects/icons/light.svg";
import LuckySVG from "@/components/projects/icons/lucky.svg";
import MaxSVG from "@/components/projects/icons/max.svg";
import NormalSVG from "@/components/projects/icons/normal.svg";
import ShadowSVG from "@/components/projects/icons/shadow.svg";
import ShinySVG from "@/components/projects/icons/shiny.svg";
import ShinyStar3SVG from "@/components/projects/icons/shinyStar3.svg";
import Star3SVG from "@/components/projects/icons/star3.svg";

export const NormalIcon: React.FC = (props) => {
  return <NormalSVG {...props} />;
};
export const Star3Icon: React.FC = (props) => {
  return <Star3SVG {...props} />;
};
export const ShinyIcon: React.FC = (props) => {
  return <ShinySVG {...props} />;
};
export const ShinyStar3Icon: React.FC = (props) => {
  return <ShinyStar3SVG {...props} />;
};
export const MaxIcon: React.FC = (props) => {
  return <MaxSVG {...props} />;
};
export const ShadowIcon: React.FC = (props) => {
  return <ShadowSVG {...props} />;
};
export const LightIcon: React.FC = (props) => {
  return <LightSVG {...props} />;
};
export const LuckyIcon: React.FC = (props) => {
  return <LuckySVG {...props} />;
};
