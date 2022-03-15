import * as React from "react";
import { SVGProps, memo } from "react";

const SvgReplay = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" {...props}><g><rect fill="none" height={24} width={24} /><rect fill="none" height={24} width={24} /><rect fill="none" height={24} width={24} /></g><g><g /><path d="M12,5V1L7,6l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6H4c0,4.42,3.58,8,8,8s8-3.58,8-8S16.42,5,12,5z" /></g></svg>;

const Memo = memo(SvgReplay);
export default Memo;