import { gsap } from "gsap/gsap-core";

import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, InertiaPlugin);

export { gsap, GSAPSplitText, InertiaPlugin, ScrollTrigger };
