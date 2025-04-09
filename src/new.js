/>
</span>
<span
  class="MuiTypography-root MuiTypography-body1  MuiFormControlLabel-label  css-1edfpdg-MuiTypography-root"
>
  Detailed Overview
</span>
</label>
</h5>
<div
class="MuiBox-root css-u5yl20"
>
<p
class="MuiTypography-root MuiTypography-body2  css-1qpi4wl-MuiTypography-root"
>
Comparison Indicators:
</p>
<div
class="MuiBox-root css-egmpzt"
>
<svg
  aria-hidden="true"
  class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium  css-1u2klq-MuiSvgIcon-root"
  data-testid="ArrowDropUpIcon"
  focusable="false"
  viewBox="0 0 24 24"
>
  <path
    d="m7 14 5-5 5 5z"
  />
</svg>
<p
  class="MuiTypography-root MuiTypography-body2  css-1nmqws6-MuiTypography-root"
>
  Store value is higher than market

</p>
</div>
<div
class="MuiBox-root css-axw7ok"
>
<svg
  aria-hidden="true"
  class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium  css-6modce-MuiSvgIcon-root"
  data-testid="ArrowDropDownIcon"
  focusable="false"
  viewBox="0 0 24 24"
>
  <path
    d="m7 10 5 5 5-5z"
  />
</svg>
<p
  class="MuiTypography-root MuiTypography-body2  css-1nmqws6-MuiTypography-root"
>
  Store value is lower than market

</p>
</div>
</div>
<div
class="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-2  css-16m4wkv-MuiGrid2-root"
>
<div
class="MuiGrid2-root MuiGrid2-direction-xs-row  css-1fzlhpv-MuiGrid2-root"
md="6"
xs="12"
>
<div
  class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1  MuiCard-root  css-1lav1b5-MuiPaper-root-MuiCard-root"
  style="--Paper-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);"
>
  <p
    class="MuiTypography-root MuiTypography-body1  css-9rafx9-MuiTypography-root"
  >
    Sales
  </p>
  <div
    class="MuiCardContent-root  css-46bh2p-MuiCardContent-root"
  >
    <div
      class="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3  css-e9a930-MuiGrid2-root"  
    >
      <div
        class="MuiGrid2-root MuiGrid2-direction-xs-row  css-1fzlhpv-MuiGrid2-root"
        xs="6"
      >
        <h6
          class="MuiTypography-root MuiTypography-h6  css-tglbhk-MuiTypography-root"
        >
          Store:
        </h6>
        <div
          class="MuiBox-root css-dg598o"
        >
          <p
            class="MuiTypography-root MuiTypography-body1  css-98054b-MuiTypography-root"
          >
            $
          </p>
          <p
            class="MuiTypography-root MuiTypography-body1  css-1qq3fcx-MuiTypography-root"
          ...

91 |     await waitFor(() => {
92 |       expect(getPnl).toHaveBeenCalledWith(undefined, undefined, mockStoreId);
> 93 |       expect(getPnl).toHaveBeenCalledWith(undefined, 'Test Market', undefined);
|                      ^
94 |       expect(getStoreById).toHaveBeenCalledWith(mockStoreId);
95 |     });
96 |   });

at src/pages/performance/ProfitAndLoss.test.js:93:22
at runWithExpensiveErrorDiagnosticsDisabled (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/config.js:47:12)
at checkCallback (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/wait-for.js:127:77)
at checkRealTimersCallback (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/wait-for.js:121:16)
at Timeout.task [as _onTimeout] (node_modules/jsdom/lib/jsdom/browser/Window.js:516:19)

● ProfitAndLoss Component › expands and collapses NRE and RE sections

Unable to find an element with the text: View More, which matches selector 'a'. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

Ignored nodes: comments, script, style
<body>
<div>
<div>
PageHeader Mock
</div>
<div
class="MuiBox-root css-a79foq"
>
<div
class="MuiBox-root css-18bxxuj"
>
<h5
class="MuiTypography-root MuiTypography-h5  css-13cxg7c-MuiTypography-root"
>
Store Profit and Loss Metrics
<label
class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd  css-sp39m6-MuiFormControlLabel-root"
>
<span
class="MuiSwitch-root MuiSwitch-sizeMedium  css-julti5-MuiSwitch-root"
>
<span
  class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary   PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary   css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase"
>
  <input
    class="PrivateSwitchBase-input MuiSwitch-input   css-1m9pwf3"
    type="checkbox"
  />
  <span
    class="MuiSwitch-thumb  css-jsexje-MuiSwitch-thumb"
  />
</span>
<span
  class="MuiSwitch-track  css-1yjjitx-MuiSwitch-track"
/>
</span>
<span
class="MuiTypography-root MuiTypography-body1  MuiFormControlLabel-label  css-1edfpdg-MuiTypography-root"
>
Detailed Overview
</span>
</label>
</h5>
<div
class="MuiBox-root css-u5yl20"
>
<p
class="MuiTypography-root MuiTypography-body2  css-1qpi4wl-MuiTypography-root"
>
Comparison Indicators:
</p>
<div
class="MuiBox-root css-egmpzt"
>
<svg
aria-hidden="true"
class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium  css-1u2klq-MuiSvgIcon-root"
data-testid="ArrowDropUpIcon"
focusable="false"
viewBox="0 0 24 24"
>
<path
  d="m7 14 5-5 5 5z"
/>
</svg>
<p
class="MuiTypography-root MuiTypography-body2  css-1nmqws6-MuiTypography-root"
>
Store value is higher than market

</p>
</div>
<div
class="MuiBox-root css-axw7ok"
>
<svg
aria-hidden="true"
class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium  css-6modce-MuiSvgIcon-root"
data-testid="ArrowDropDownIcon"
focusable="false"
viewBox="0 0 24 24"
>
<path
  d="m7 10 5 5 5-5z"
/>
</svg>
<p
class="MuiTypography-root MuiTypography-body2  css-1nmqws6-MuiTypography-root"
>
Store value is lower than market

</p>
</div>
</div>
<div
class="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-2  css-16m4wkv-MuiGrid2-root"
>
<div
class="MuiGrid2-root MuiGrid2-direction-xs-row  css-1fzlhpv-MuiGrid2-root"
md="6"
xs="12"
>
<div
class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1  MuiCard-root  css-1lav1b5-MuiPaper-root-MuiCard-root"
style="--Paper-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);"
>
<p
  class="MuiTypography-root MuiTypography-body1  css-9rafx9-MuiTypography-root"
>
  Sales
</p>
<div
  class="MuiCardContent-root  css-46bh2p-MuiCardContent-root"
>
  <div
    class="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3  css-e9a930-MuiGrid2-root"    
  >
    <div
      class="MuiGrid2-root MuiGrid2-direction-xs-row  css-1fzlhpv-MuiGrid2-root"
      xs="6"
    >
      <h6
        class="MuiTypography-root MuiTypography-h6  css-tglbhk-MuiTypography-root"
      >
        Store:
      </h6>
      <div
        class="MuiBox-root css-dg598o"
      >
        <p
          class="MuiTypography-root MuiTypography-body1  css-98054b-MuiTypography-root"
        >
          $
        </p>
        <p
          class="MuiTypography-root MuiTypography-body1  css-1qq3fcx-MuiTypography-root"
        >
          $0.00
        </p>
      </div>
      <div
        class="MuiBox-root css-dg598o"
      >
        <p
    ...

132 |     );
133 |
> 134 |     await waitFor(() => {
|                  ^
135 |       const nreLink = screen.getByText('View More', { selector: 'a' });
136 |       fireEvent.click(nreLink);
137 |       expect(screen.getByText('View Less')).toBeInTheDocument();

at waitForWrapper (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/wait-for.js:166:27)
at call (src/pages/performance/ProfitAndLoss.test.js:134:18)
at tryCatch (src/pages/performance/ProfitAndLoss.test.js:2:1)
at Generator._invoke (src/pages/performance/ProfitAndLoss.test.js:2:1)
at Generator.next (src/pages/performance/ProfitAndLoss.test.js:2:1)
at asyncGeneratorStep (src/pages/performance/ProfitAndLoss.test.js:2:1)
at _next (src/pages/performance/ProfitAndLoss.test.js:2:1)
at src/pages/performance/ProfitAndLoss.test.js:2:1
at Object.<anonymous> (src/pages/performance/ProfitAndLoss.test.js:2:1)
at TestScheduler.scheduleTests (node_modules/@jest/core/build/TestScheduler.js:333:13)
at runJest (node_modules/@jest/core/build/runJest.js:404:19)
at _run10000 (node_modules/@jest/core/build/cli/index.js:320:7)
at runCLI (node_modules/@jest/core/build/cli/index.js:173:3)

● ProfitAndLoss Component › handles year change

Unable to find role="combobox"

Ignored nodes: comments, script, style
<body>
<div>
<div>
PageHeader Mock
</div>
<div
class="MuiBox-root css-a79foq"
>
<div
class="MuiBox-root css-18bxxuj"
>
<h5
class="MuiTypography-root MuiTypography-h5  css-13cxg7c-MuiTypography-root"
>
Store Profit and Loss Metrics
<label
class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd  css-sp39m6-MuiFormControlLabel-root"
>
<span
class="MuiSwitch-root MuiSwitch-sizeMedium  css-julti5-MuiSwitch-root"
>
<span
  class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary   PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary   css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase"
>
  <input
    class="PrivateSwitchBase-input MuiSwitch-input   css-1m9pwf3"
    type="checkbox"
  />
  <span
    class="MuiSwitch-thumb  css-jsexje-MuiSwitch-thumb"
  />
</span>
<span
  class="MuiSwitch-track  css-1yjjitx-MuiSwitch-track"
/>
</span>
<span
class="MuiTypography-root MuiTypography-body1  MuiFormControlLabel-label  css-1edfpdg-MuiTypography-root"
>
Detailed Overview
</span>
</label>
</h5>
<div
class="MuiBox-root css-u5yl20"
>
<p
class="MuiTypography-root MuiTypography-body2  css-1qpi4wl-MuiTypography-root"
>
Comparison Indicators:
</p>
<div
class="MuiBox-root css-egmpzt"
>
<svg
aria-hidden="true"
class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium  css-1u2klq-MuiSvgIcon-root"
data-testid="ArrowDropUpIcon"
focusable="false"
viewBox="0 0 24 24"
>
<path
  d="m7 14 5-5 5 5z"
/>
</svg>
<p
class="MuiTypography-root MuiTypography-body2  css-1nmqws6-MuiTypography-root"
>
Store value is higher than market

</p>
</div>
<div
class="MuiBox-root css-axw7ok"
>
<svg
aria-hidden="true"
class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium  css-6modce-MuiSvgIcon-root"
data-testid="ArrowDropDownIcon"
focusable="false"
viewBox="0 0 24 24"
>
<path
  d="m7 10 5 5 5-5z"
/>
</svg>
<p
class="MuiTypography-root MuiTypography-body2  css-1nmqws6-MuiTypography-root"
>
Store value is lower than market

</p>
</div>
</div>
<div
class="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-2  css-16m4wkv-MuiGrid2-root"
>
<div
class="MuiGrid2-root MuiGrid2-direction-xs-row  css-1fzlhpv-MuiGrid2-root"
md="6"
xs="12"
>
<div
class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1  MuiCard-root  css-1lav1b5-MuiPaper-root-MuiCard-root"
style="--Paper-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);"
>
<p
  class="MuiTypography-root MuiTypography-body1  css-9rafx9-MuiTypography-root"
>
  Sales
</p>
<div
  class="MuiCardContent-root  css-46bh2p-MuiCardContent-root"
>
  <div
    class="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3  css-e9a930-MuiGrid2-root"    
  >
    <div
      class="MuiGrid2-root MuiGrid2-direction-xs-row  css-1fzlhpv-MuiGrid2-root"
      xs="6"
    >
      <h6
        class="MuiTypography-root MuiTypography-h6  css-tglbhk-MuiTypography-root"
      >
        Store:
      </h6>
      <div
        class="MuiBox-root css-dg598o"
      >
        <p
          class="MuiTypography-root MuiTypography-body1  css-98054b-MuiTypography-root"
        >
          $
        </p>
        <p
          class="MuiTypography-root MuiTypography-body1  css-1qq3fcx-MuiTypography-root"
        >
          $0.00
        </p>
      </div>
      <div
        class="MuiBox-root css-dg598o"
      >
        <p
    ...

146 |     );
147 |
> 148 |     await waitFor(() => {
|                  ^
149 |       // Mock the PageHeader's year change handler
150 |       const yearSelect = screen.getByRole('combobox');
151 |       fireEvent.change(yearSelect, { target: { value: '2022' } });

at waitForWrapper (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/wait-for.js:166:27)
at call (src/pages/performance/ProfitAndLoss.test.js:148:18)
at tryCatch (src/pages/performance/ProfitAndLoss.test.js:2:1)
at Generator._invoke (src/pages/performance/ProfitAndLoss.test.js:2:1)
at Generator.next (src/pages/performance/ProfitAndLoss.test.js:2:1)
at asyncGeneratorStep (src/pages/performance/ProfitAndLoss.test.js:2:1)
at _next (src/pages/performance/ProfitAndLoss.test.js:2:1)
at src/pages/performance/ProfitAndLoss.test.js:2:1
at Object.<anonymous> (src/pages/performance/ProfitAndLoss.test.js:2:1)
at TestScheduler.scheduleTests (node_modules/@jest/core/build/TestScheduler.js:333:13)
at runJest (node_modules/@jest/core/build/runJest.js:404:19)
at _run10000 (node_modules/@jest/core/build/cli/index.js:320:7)
at runCLI (node_modules/@jest/core/build/cli/index.js:173:3)

● ProfitAndLoss Component › handles error state when data is not available

Found multiple elements with the text: /N\/A|0/

Here are the matching elements:

Ignored nodes: comments, script, style
<p
class="MuiTypography-root MuiTypography-body1  css-1qq3fcx-MuiTypography-root"
>
N/A
</p>

Ignored nodes: comments, script, style
<p
class="MuiTypography-root MuiTypography-body1  css-1qq3fcx-MuiTypography-root"
>
N/A
</p>

Ignored nodes: comments, script, style
<p
class="MuiTypography-root MuiTypography-body1  css-1qq3fcx-MuiTypography-root"
>
N/A
</p>

Ignored nodes: comments, script, style
<p
class="MuiTypography-root MuiTypography-body1  css-1qq3fcx-MuiTypography-root"
>
N/A
</p>

Ignored nodes: comments, script, style
<p
class="MuiTypography-root MuiTypography-body1  css-1qq3fcx-MuiTypography-root"
>
N/A
</p>

Ignored nodes: comments, script, style
<p
class="MuiTypography-root MuiTypography-body1  css-1qq3fcx-MuiTypography-root"
>
N/A
</p>

Ignored nodes: comments, script, style
<p
class="MuiTypography-root MuiTypography-body1  css-1qq3fcx-MuiTypography-root"
>
N/A
</p>

Ignored nodes: comments, script, style
<p
class="MuiTypography-root MuiTypography-body1  css-1qq3fcx-MuiTypography-root"
>
N/A
</p>

Ignored nodes: comments, script, style
<p
class="MuiTypography-root MuiTypography-body1  css-1qq3fcx-MuiTypography-root"
>
N/A
</p>

Ignored nodes: comments, script, style
<p
class="MuiTypography-root MuiTypography-body1  css-1qq3fcx-MuiTypography-root"
>
N/A
</p>

(If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).      

Ignored nodes: comments, script, style
<body>
<div>
<div>
PageHeader Mock
</div>
<div
class="MuiBox-root css-a79foq"
>
<div
class="MuiBox-root css-18bxxuj"
>
<h5
class="MuiTypography-root MuiTypography-h5  css-13cxg7c-MuiTypography-root"
>
Store Profit and Loss Metrics
<label
class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd  css-sp39m6-MuiFormControlLabel-root"
>
<span
class="MuiSwitch-root MuiSwitch-sizeMedium  css-julti5-MuiSwitch-root"
>
<span
  class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary   PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary   css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase"
>
  <input
    class="PrivateSwitchBase-input MuiSwitch-input   css-1m9pwf3"
    type="checkbox"
  />
  <span
    class="MuiSwitch-thumb  css-jsexje-MuiSwitch-thumb"
  />
</span>
<span
  class="MuiSwitch-track  css-1yjjitx-MuiSwitch-track"
/>
</span>
<span
class="MuiTypography-root MuiTypography-body1  MuiFormControlLabel-label  css-1edfpdg-MuiTypography-root"
>
Detailed Overview
</span>
</label>
</h5>
<div
class="MuiBox-root css-u5yl20"
>
<p
class="MuiTypography-root MuiTypography-body2  css-1qpi4wl-MuiTypography-root"
>
Comparison Indicators:
</p>
<div
class="MuiBox-root css-egmpzt"
>
<svg
aria-hidden="true"
class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium  css-1u2klq-MuiSvgIcon-root"
data-testid="ArrowDropUpIcon"
focusable="false"
viewBox="0 0 24 24"
>
<path
  d="m7 14 5-5 5 5z"
/>
</svg>
<p
class="MuiTypography-root MuiTypography-body2  css-1nmqws6-MuiTypography-root"
>
Store value is higher than market

</p>
</div>
<div
class="MuiBox-root css-axw7ok"
>
<svg
aria-hidden="true"
class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium  css-6modce-MuiSvgIcon-root"
data-testid="ArrowDropDownIcon"
focusable="false"
viewBox="0 0 24 24"
>
<path
  d="m7 10 5 5 5-5z"
/>
</svg>
<p
class="MuiTypography-root MuiTypography-body2  css-1nmqws6-MuiTypography-root"
>
Store value is lower than market

</p>
</div>
</div>
<div
class="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-2  css-16m4wkv-MuiGrid2-root"
>
<div
class="MuiGrid2-root MuiGrid2-direction-xs-row  css-1fzlhpv-MuiGrid2-root"
md="6"
xs="12"
>
<div
class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1  MuiCard-root  css-1lav1b5-MuiPaper-root-MuiCard-root"
style="--Paper-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);"
>
<p
  class="MuiTypography-root MuiTypography-body1  css-9rafx9-MuiTypography-root"
>
  Sales
</p>
<div
  class="MuiCardContent-root  css-46bh2p-MuiCardContent-root"
>
  <div
    class="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3  css-e9a930-MuiGrid2-root"    
  >
    <div
      class="MuiGrid2-root MuiGrid2-direction-xs-row  css-1fzlhpv-MuiGrid2-root"
      xs="6"
    >
      <h6
        class="MuiTypography-root MuiTypography-h6  css-tglbhk-MuiTypography-root"
      >
        Store:
      </h6>
      <div
        class="MuiBox-root css-dg598o"
      >
        <p
          class="MuiTypography-root MuiTypography-body1  css-98054b-MuiTypography-root"
        >
          $
        </p>
        <p
          class="MuiTypography-root MuiTypography-body1  css-1qq3fcx-MuiTypography-root"
        >
          -$NaN
        </p>
      </div>
      <div
        class="MuiBox-root css-dg598o"
      >
        <p
    ...

206 |     );
207 |
> 208 |     await waitFor(() => {
|                  ^
209 |       expect(screen.getByText(/N\/A|0/)).toBeInTheDocument();
210 |     });
211 |   });

at waitForWrapper (node_modules/@testing-library/react/node_modules/@testing-library/dom/dist/wait-for.js:166:27)
at call (src/pages/performance/ProfitAndLoss.test.js:208:18)
at tryCatch (src/pages/performance/ProfitAndLoss.test.js:2:1)
at Generator._invoke (src/pages/performance/ProfitAndLoss.test.js:2:1)
at Generator.next (src/pages/performance/ProfitAndLoss.test.js:2:1)
at asyncGeneratorStep (src/pages/performance/ProfitAndLoss.test.js:2:1)
at _next (src/pages/performance/ProfitAndLoss.test.js:2:1)
at src/pages/performance/ProfitAndLoss.test.js:2:1
at Object.<anonymous> (src/pages/performance/ProfitAndLoss.test.js:2:1)
at TestScheduler.scheduleTests (node_modules/@jest/core/build/TestScheduler.js:333:13)
at runJest (node_modules/@jest/core/build/runJest.js:404:19)
at _run10000 (node_modules/@jest/core/build/cli/index.js:320:7)
at runCLI (node_modules/@jest/core/build/cli/index.js:173:3)

● ProfitAndLoss Component › formats percentage values correctly

Unable to find an element with the text: /%/. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

Ignored nodes: comments, script, style
<body>
<div>
<div>
PageHeader Mock
</div>
<div
class="MuiBox-root css-a79foq"
>
<div
class="MuiBox-root css-18bxxuj"
>
<h5
class="MuiTypography-root MuiTypography-h5  css-13cxg7c-MuiTypography-root"
>
Store Profit and Loss Metrics
<label
class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd  css-sp39m6-MuiFormControlLabel-root"
>
<span
class="MuiSwitch-root MuiSwitch-sizeMedium  css-julti5-MuiSwitch-root"
>
<span
  class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary   PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary   css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase"
>
  <input
    class="PrivateSwitchBase-input MuiSwitch-input   css-1m9pwf3"
    type="checkbox"
  />
  <span
    class="MuiSwitch-thumb  css-jsexje-MuiSwitch-thumb"
  />
</span>
<span
  class="MuiSwitch-track  css-1yjjitx-MuiSwitch-track"
/>
</span>
<span
class="MuiTypography-root MuiTypography-body1  MuiFormControlLabel-label  css-1edfpdg-MuiTypography-root"
>
Detailed Overview
</span>
</label>
</h5>
<div
class="MuiBox-root css-u5yl20"
>
<p
class="MuiTypography-root MuiTypography-body2  css-1qpi4wl-MuiTypography-root"
>
Comparison Indicators:
</p>
<div
class="MuiBox-root css-egmpzt"
>
<svg
aria-hidden="true"
class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium  css-1u2klq-MuiSvgIcon-root"
data-testid="ArrowDropUpIcon"
focusable="false"
viewBox="0 0 24 24"
>
<path
  d="m7 14 5-5 5 5z"
/>
</svg>
<p
class="MuiTypography-root MuiTypography-body2  css-1nmqws6-MuiTypography-root"
>
Store value is higher than market

</p>
</div>
<div
class="MuiBox-root css-axw7ok"
>
<svg
aria-hidden="true"
class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium  css-6modce-MuiSvgIcon-root"
data-testid="ArrowDropDownIcon"
focusable="false"
viewBox="0 0 24 24"
>
<path
  d="m7 10 5 5 5-5z"
/>
</svg>
<p
class="MuiTypography-root MuiTypography-body2  css-1nmqws6-MuiTypography-root"
>
Store value is lower than market

</p>
</div>
</div>
<div
class="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-2  css-16m4wkv-MuiGrid2-root"
>
<div
class="MuiGrid2-root MuiGrid2-direction-xs-row  css-1fzlhpv-MuiGrid2-root"
md="6"
xs="12"
>
<div
class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1  MuiCard-root  css-1lav1b5-MuiPaper-root-MuiCard-root"
style="--Paper-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);"
>
<p
  class="MuiTypography-root MuiTypography-body1  css-9rafx9-MuiTypography-root"
>
  Sales
</p>
<div
  class="MuiCardContent-root  css-46bh2p-MuiCardContent-root"
>
  <div
    class="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3  css-e9a930-MuiGrid2-root"    
  >
    <div
      class="MuiGrid2-root MuiGrid2-direction-xs-row  css-1fzlhpv-MuiGrid2-root"
      xs="6"
    >
      <h6
        class="MuiTypography-root MuiTypography-h6  css-tglbhk-MuiTypography-root"
      >
        Store:
      </h6>
      <div
        class="MuiBox-root css-dg598o"
      >
        <p
          class="MuiTypography-root MuiTypography-body1  css-98054b-MuiTypography-root"
        >
          $
        </p>
        <p
          class="MuiTypography-root MuiTypography-body1  css-1qq3fcx-MuiTypography-root"
        >
          $0.00
        </p>
      </div>
      <div
        class="MuiBox-root css-dg598o"
      >
        <p
    ...

218 |     );
219 |
> 220 |     await waitFor(() => {
|                  ^
221 |       const percentageValues = screen.getAllByText(/%/);
222 |       percentageValues.forEach(value => {
223 |         expect(value.textContent).toMatch(/\d+\.\d{2}%/);

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 passed, 10 total
Snapshots:   0 total
Time:        14.024 s