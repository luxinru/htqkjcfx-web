import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import React, { Suspense } from 'react'
import Effects from './Effects'
import Pie from './Pie'
import Turntable from './Turntable'
import useInputControls, { pieDataFromControls } from './useInputControls'

function App() {
  const orbitControlsRef = React.useRef()
  const [controlValues, set] = useInputControls()
  const data = pieDataFromControls(controlValues)
  const {
    innerRadius,
    outerRadius,
    cornerRadius,
    padAngle,
    environmentFile,
    spotLightIntensity,
    ambientLightIntensity,
    roughness,
    metalness,
    valueLabelPosition,
    showBloom,
    bloomStrength,
    bloomRadius,
    bloomThreshold,
    spinSpeed,
    backgroundColor,
    title,
    titleMaxWidth,
    titleOffset,
    showValues,
    valuesAsPercent,
  } = controlValues

  const addEnvironment = !!environmentFile

  return (
    <div
      id="canvas-container"
      className="w-full h-full"
      style={{ backgroundColor }}
    >
      <Leva
        collapsed={window.innerWidth < 800}
        titleBar={{ title: 'Customize Pie' }}
      />
      <Canvas shadows dpr={[1, 2]} camera={{ position: [3, 3, 4], fov: 50 }}>
        <ambientLight intensity={ambientLightIntensity} />

        <spotLight
          intensity={spotLightIntensity}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />

        <Suspense fallback={null}>
          <Turntable enabled={spinSpeed > 0} speed={spinSpeed * 0.02}>
            <Pie
              data={data}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              cornerRadius={cornerRadius}
              padAngle={padAngle}
              roughness={roughness}
              metalness={metalness}
              valueLabelPosition={valueLabelPosition}
              showValues={showValues}
              valuesAsPercent={valuesAsPercent}
              onClickSlice={(i) =>
                set({ [`explode${i}`]: !controlValues[`explode${i}`] })
              }
            />
          </Turntable>
        </Suspense>
        {addEnvironment && (
          <Suspense fallback={null}>
            <Environment path="/hdri/" files={environmentFile} />
          </Suspense>
        )}
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -0.4, 0]}
          opacity={0.65}
          width={30}
          height={30}
          blur={1.5}
          far={0.8}
        />
        {/* <GizmoHelper
          alignment={'bottom-left'}
          margin={[80, 80]}
          onTarget={() => orbitControlsRef?.current?.target}
          onUpdate={() => orbitControlsRef.current?.update()}
        >
          <GizmoViewport
            axisColors={['red', 'green', 'blue']}
            labelColor={'white'}
          />
        </GizmoHelper> */}
        <OrbitControls
          ref={orbitControlsRef}
          // minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          // enableZoom={false}
          enablePan={false}
        />
        {showBloom && (
          <Effects
            backgroundColor={backgroundColor}
            bloomStrength={bloomStrength}
            bloomThreshold={bloomThreshold}
            bloomRadius={bloomRadius}
          />
        )}
      </Canvas>
      {/* Optionally render the 2D version */}
      {/* <div className="absolute top-0 left-0">
        <SvgPie data={data} />
      </div> */}
      <div
        className="absolute w-full mx-auto text-3xl font-black text-center poxinter-events-none"
        style={{
          top: '50%',
          left: '50%',
          maxWidth: `${titleMaxWidth}vw`,
          transform: `translate(-50%, ${titleOffset}vh)`,
          textShadow: `-1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black, 1px -1px 0 black, 4px 4px 10px rgba(0,0,0,0.5)`,
        }}
      >
        {title}
      </div>
      <div className="absolute bottom-0 p-2 text-xs text-gray-500">
        Made with 😈&nbsp; by{' '}
        <a
          href="https://peterbeshai.com"
          className="font-semibold hover:underline"
        >
          Peter Beshai
        </a>
        <a
          href="https://github.com/pbeshai/3dpie"
          className="ml-2 font-medium hover:underline"
        >
          GitHub
        </a>
      </div>
    </div>
  )
}

export default App
