/* ============================================
   3D SCENE - CAR MODEL WITH RESPONSIVE CONTROLS & HOTSPOTS
   Enhanced version with mobile support and camera-aware hotspots
   ============================================ */

(function() {
  'use strict';
  
  const container = document.getElementById('threejs-car');
  if (!container) return;
  
  let scene, camera, renderer, controls;
  let carGroup, mixer;
  let dotPlane = [];
  let hotspots = [];
  const clock = new THREE.Clock();
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                   || window.innerWidth <= 768;
  let modelLoaded = false; // Flag to prevent duplicate loading
  
  // Car part hotspots with 3D positions
  const HOTSPOT_DATA = [
    {
      id: 'front-wing',
      nameKey: 'hotspots.front-wing.name',
      descriptionKey: 'hotspots.front-wing.description',
      position: { x: 0, y: 0.3, z: 1.8 },
      normal: { x: 0, y: 0, z: 1 }, // Faces forward
      visibilityThreshold: 0.3
    },
    {
      id: 'rear-wing',
      nameKey: 'hotspots.rear-wing.name',
      descriptionKey: 'hotspots.rear-wing.description',
      position: { x: 0, y: 0.8, z: -1.5 },
      normal: { x: 0, y: 0, z: -1 }, // Faces backward
      visibilityThreshold: 0.3
    },
    {
      id: 'cockpit',
      nameKey: 'hotspots.cockpit.name',
      descriptionKey: 'hotspots.cockpit.description',
      position: { x: 0, y: 0.6, z: 0 },
      normal: { x: 0, y: 1, z: 0 }, // Faces upward
      visibilityThreshold: 0.5
    },
    {
      id: 'left-side',
      nameKey: 'hotspots.left-side.name',
      descriptionKey: 'hotspots.left-side.description',
      position: { x: -0.8, y: 0.4, z: 0 },
      normal: { x: -1, y: 0, z: 0 }, // Faces left
      visibilityThreshold: 0.3
    }
  ];
  
  // Configuration
  const CONFIG = {
    camera: {
      fov: 50,
      near: 0.1,
      far: 1000,
      // Camera position for good view
      position: { x: 5, y: 3, z: 8 }
    },
    controls: {
      // Enable slow auto-rotation
      autoRotate: true, // Always auto-rotate
      autoRotateSpeed: 0.5, // Slow steady rotation
      enableDamping: true,
      dampingFactor: 0.05,
      enableRotate: !isMobile, // Manual rotation on desktop
      enableZoom: false, // Disable free zoom
      minDistance: 6,
      maxDistance: 15,
      minPolarAngle: Math.PI / 4,
      maxPolarAngle: Math.PI / 2 + 0.2,
      minAzimuthAngle: isMobile ? 0 : -Infinity,
      maxAzimuthAngle: isMobile ? 0 : Infinity
    },
    plane: {
      size: 50,  // Extended from 25 to 50 for wider coverage
      segments: isMobile ? 40 : 80, // More segments for larger plane
      waveSpeed: 0.5,
      waveHeight: 0.15,
      dotSize: 0.03,
      dotColor: 0xFA8F31,
      planeHeight: -2
    },
    lights: {
      ambient: { color: 0xffffff, intensity: 0.4 },
      directional1: { color: 0xFA8F31, intensity: 0.8, position: { x: 5, y: 5, z: 5 } },
      directional2: { color: 0xF16D26, intensity: 0.5, position: { x: -5, y: 3, z: -5 } },
      point1: { color: 0xAA1811, intensity: 0.6, position: { x: 0, y: 3, z: 0 } }
    },
    carModel: {
      path: 'components/rotatingCarChassis.glb',  // Use chassis directly as primary
      fallbackPath: null,  // No fallback needed
      scale: 3.5,  // Slightly smaller - from 4.5 to 3.5
      // Centered position - text will overlay with glass effect
      positionOffset: { x: 0, y: 0, z: 0 },
      color: 0xFA8F31,
      emissiveIntensity: 0.3,
      opacity: 0.85,
      metalness: 0.9,
      roughness: 0.15
    },
    hotspot: {
      arrowSize: 0.15,
      arrowColor: 0xFA8F31,
      lineColor: 0xF16D26,
      highlightColor: 0xFFAA55,
      highlightOpacity: 0.3
    }
  };
  
  // Initialize scene
  function init() {
    const width = container.offsetWidth || window.innerWidth;
    const height = container.offsetHeight || window.innerHeight;
    
    // Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 10, 25);
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(
      CONFIG.camera.fov,
      width / height,
      CONFIG.camera.near,
      CONFIG.camera.far
    );
    camera.position.set(
      CONFIG.camera.position.x,
      CONFIG.camera.position.y,
      CONFIG.camera.position.z
    );
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, // Disable AA on mobile for performance
      alpha: true,
      powerPreference: isMobile ? 'low-power' : 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.shadowMap.enabled = !isMobile; // Disable shadows on mobile
    if (!isMobile) {
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    
    // Set background layer (z-index handled in CSS)
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '0';
    
    container.appendChild(renderer.domElement);
    
    // Controls setup
    if (!isMobile) {
      setupDesktopControls();
    } else {
      setupMobileControls();
    }
    
    // Add lights
    setupLights();
    
    // Add wavy dot plane
    createWavyDotPlane();
    
    // Load car model
    loadCarModel();
    
    // Create hotspot elements (only on desktop)
    if (!isMobile) {
      createHotspotElements();
    }
    
    // Start animation
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Listen for language changes to update hotspots
    document.addEventListener('languageChanged', () => {
      if (!isMobile && window.i18n) {
        // Remove old hotspots
        container.querySelectorAll('.car-hotspot').forEach(el => el.remove());
        // Recreate with new language
        createHotspotElements();
      }
    });
  }
  
  // Setup desktop controls with orbit
  function setupDesktopControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = CONFIG.controls.autoRotate;
    controls.autoRotateSpeed = CONFIG.controls.autoRotateSpeed;
    controls.enableDamping = CONFIG.controls.enableDamping;
    controls.dampingFactor = CONFIG.controls.dampingFactor;
    controls.enableRotate = CONFIG.controls.enableRotate;
    controls.enableZoom = CONFIG.controls.enableZoom;
    controls.minDistance = CONFIG.controls.minDistance;
    controls.maxDistance = CONFIG.controls.maxDistance;
    controls.minPolarAngle = CONFIG.controls.minPolarAngle;
    controls.maxPolarAngle = CONFIG.controls.maxPolarAngle;
    controls.target.set(0, 0, 0);  // Look at origin where car is
    controls.update();
    
    // Setup interaction handlers
    setupInteraction();
  }
  
  // Setup mobile controls (static or simple parallax)
  function setupMobileControls() {
    // No orbit controls on mobile
    // Optional: add simple parallax based on device orientation
    if (window.DeviceOrientationEvent) {
      setupParallaxControls();
    }
  }
  
  // Optional parallax controls for mobile
  function setupParallaxControls() {
    let isPermissionGranted = false;
    
    // Check if permission is needed (iOS 13+)
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      // Will need user interaction to request permission
      return; // Skip for now - can add a button later
    }
    
    window.addEventListener('deviceorientation', (event) => {
      if (!camera || !event.beta || !event.gamma) return;
      
      // Subtle camera movement based on device tilt
      const maxTilt = 30; // degrees
      const beta = Math.max(-maxTilt, Math.min(maxTilt, event.beta)); // Front-to-back tilt
      const gamma = Math.max(-maxTilt, Math.min(maxTilt, event.gamma)); // Left-to-right tilt
      
      // Apply subtle rotation
      camera.rotation.x = (beta / maxTilt) * 0.1;
      camera.rotation.y = (gamma / maxTilt) * 0.1;
    }, { passive: true });
  }
  
  // Setup lights
  function setupLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(
      CONFIG.lights.ambient.color,
      CONFIG.lights.ambient.intensity
    );
    scene.add(ambientLight);
    
    // Directional light 1 (main orange light)
    const directionalLight1 = new THREE.DirectionalLight(
      CONFIG.lights.directional1.color,
      CONFIG.lights.directional1.intensity
    );
    directionalLight1.position.set(
      CONFIG.lights.directional1.position.x,
      CONFIG.lights.directional1.position.y,
      CONFIG.lights.directional1.position.z
    );
    if (!isMobile) {
      directionalLight1.castShadow = true;
      directionalLight1.shadow.mapSize.width = 2048;
      directionalLight1.shadow.mapSize.height = 2048;
    }
    scene.add(directionalLight1);
    
    // Directional light 2 (secondary fill light)
    const directionalLight2 = new THREE.DirectionalLight(
      CONFIG.lights.directional2.color,
      CONFIG.lights.directional2.intensity
    );
    directionalLight2.position.set(
      CONFIG.lights.directional2.position.x,
      CONFIG.lights.directional2.position.y,
      CONFIG.lights.directional2.position.z
    );
    scene.add(directionalLight2);
    
    // Point light (accent from below)
    const pointLight = new THREE.PointLight(
      CONFIG.lights.point1.color,
      CONFIG.lights.point1.intensity,
      10
    );
    pointLight.position.set(
      CONFIG.lights.point1.position.x,
      CONFIG.lights.point1.position.y,
      CONFIG.lights.point1.position.z
    );
    scene.add(pointLight);
  }
  
  // Create wavy dot plane
  function createWavyDotPlane() {
    const { size, segments, dotSize, dotColor, planeHeight } = CONFIG.plane;
    const spacing = size / segments;
    
    // Dot geometry and material
    const dotGeometry = new THREE.SphereGeometry(dotSize, 8, 8);
    const dotMaterial = new THREE.MeshBasicMaterial({
      color: dotColor,
      transparent: true,
      opacity: 0.6
    });
    
    // Create grid of dots
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        const dot = new THREE.Mesh(dotGeometry, dotMaterial.clone());
        
        const x = (i - segments / 2) * spacing;
        const z = (j - segments / 2) * spacing;
        
        dot.position.set(x, planeHeight, z);
        dot.userData = {
          originalY: planeHeight,
          offsetX: i * 0.5,
          offsetZ: j * 0.5
        };
        
        scene.add(dot);
        dotPlane.push(dot);
      }
    }
    
    // Add subtle grid lines
    createGridLines();
  }
  
  // Create grid lines
  function createGridLines() {
    const { size } = CONFIG.plane;
    const gridHelper = new THREE.GridHelper(
      size,
      40,
      0xFA8F31,
      0xAA1811
    );
    gridHelper.material.opacity = 0.1;  // Subtle but visible
    gridHelper.material.transparent = true;
    gridHelper.position.y = CONFIG.plane.planeHeight + 0.01;
    scene.add(gridHelper);
  }
  
  // Animate wavy dot plane
  function animateWavyPlane() {
    const time = clock.getElapsedTime();
    const { waveSpeed, waveHeight } = CONFIG.plane;
    
    dotPlane.forEach(dot => {
      const waveX = Math.sin(time * waveSpeed + dot.userData.offsetX) * waveHeight;
      const waveZ = Math.cos(time * waveSpeed + dot.userData.offsetZ) * waveHeight;
      
      dot.position.y = dot.userData.originalY + waveX + waveZ;
      
      // Fade dots based on distance from center
      const distanceFromCenter = Math.sqrt(
        dot.position.x ** 2 + dot.position.z ** 2
      );
      dot.material.opacity = Math.max(0.2, 0.8 - distanceFromCenter / 15);
    });
  }
  
  // Load car model
  function loadCarModel() {
    if (modelLoaded) {
      console.log('Model already loaded, skipping...');
      return;
    }
    
    const loader = new THREE.GLTFLoader();
    
    console.log('Attempting to load primary car model:', CONFIG.carModel.path);
    
    loader.load(
      CONFIG.carModel.path,
      function(gltf) {
        modelLoaded = true; // Set flag immediately
        console.log('✅ PRIMARY CAR MODEL LOADED SUCCESSFULLY');
        
        // Clear any existing car group
        if (carGroup) {
          scene.remove(carGroup);
          carGroup = null;
        }
        
        carGroup = new THREE.Group();
        const modelMesh = gltf.scene;
        
        // Scale the model
        modelMesh.scale.set(
          CONFIG.carModel.scale,
          CONFIG.carModel.scale,
          CONFIG.carModel.scale
        );
        
        // Calculate bounding box to center the model
        const box = new THREE.Box3().setFromObject(modelMesh);
        const center = box.getCenter(new THREE.Vector3());
        
        // Center the model within the group
        modelMesh.position.set(-center.x, -center.y, -center.z);
        
        // Apply styling to all meshes
        modelMesh.traverse((child) => {
          if (child.isMesh) {
            // Clone material to avoid affecting other instances
            child.material = child.material.clone();
            
            // Set color and properties
            child.material.color = new THREE.Color(CONFIG.carModel.color);
            child.material.emissive = new THREE.Color(CONFIG.carModel.color);
            child.material.emissiveIntensity = CONFIG.carModel.emissiveIntensity;
            
            // Add transparency
            child.material.transparent = true;
            child.material.opacity = CONFIG.carModel.opacity;
            
            // Metallic properties
            if (child.material.metalness !== undefined) {
              child.material.metalness = CONFIG.carModel.metalness;
            }
            if (child.material.roughness !== undefined) {
              child.material.roughness = CONFIG.carModel.roughness;
            }
            
            // Enable shadows
            if (!isMobile) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          }
        });
        
        carGroup.add(modelMesh);
        
        // Position the entire group
        carGroup.position.set(
          CONFIG.carModel.positionOffset.x,
          CONFIG.carModel.positionOffset.y,
          CONFIG.carModel.positionOffset.z
        );
        
        scene.add(carGroup);
        
        // Setup animations if they exist
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(modelMesh);
          gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
        }
        
        // Create hotspot anchors
        if (!isMobile) {
          createHotspotAnchors();
        }
        
        console.log('Car model loaded successfully');
      },
      function(progress) {
        if (progress.total > 0) {
          const percentComplete = (progress.loaded / progress.total * 100).toFixed(2);
          console.log(`Loading car model: ${percentComplete}%`);
        }
      },
      function(error) {
        if (modelLoaded) {
          console.log('Model already loaded successfully, ignoring error');
          return;
        }
        
        console.error('❌ Error loading primary car model:', error);
        console.log('🔄 Attempting to load fallback chassis model...');
        
        // Try loading fallback chassis model
        if (CONFIG.carModel.fallbackPath) {
          loader.load(
            CONFIG.carModel.fallbackPath,
            function(gltf) {
              modelLoaded = true; // Set flag immediately
              console.log('✅ FALLBACK CHASSIS MODEL LOADED');
              
              // Clear any existing car group
              if (carGroup) {
                scene.remove(carGroup);
                carGroup = null;
              }
              
              carGroup = new THREE.Group();
              const modelMesh = gltf.scene;
              
              // Scale the model
              modelMesh.scale.set(
                CONFIG.carModel.scale,
                CONFIG.carModel.scale,
                CONFIG.carModel.scale
              );
              
              // Calculate bounding box to center the model
              const box = new THREE.Box3().setFromObject(modelMesh);
              const center = box.getCenter(new THREE.Vector3());
              
              // Center the model within the group
              modelMesh.position.set(-center.x, -center.y, -center.z);
              
              // Apply styling to all meshes
              modelMesh.traverse((child) => {
                if (child.isMesh) {
                  child.material = child.material.clone();
                  child.material.color = new THREE.Color(CONFIG.carModel.color);
                  child.material.emissive = new THREE.Color(CONFIG.carModel.color);
                  child.material.emissiveIntensity = CONFIG.carModel.emissiveIntensity;
                  child.material.transparent = true;
                  child.material.opacity = CONFIG.carModel.opacity;
                  
                  if (child.material.metalness !== undefined) {
                    child.material.metalness = CONFIG.carModel.metalness;
                  }
                  if (child.material.roughness !== undefined) {
                    child.material.roughness = CONFIG.carModel.roughness;
                  }
                  
                  if (!isMobile) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                  }
                }
              });
              
              carGroup.add(modelMesh);
              carGroup.position.set(
                CONFIG.carModel.positionOffset.x,
                CONFIG.carModel.positionOffset.y,
                CONFIG.carModel.positionOffset.z
              );
              
              scene.add(carGroup);
              
              if (gltf.animations && gltf.animations.length > 0) {
                mixer = new THREE.AnimationMixer(modelMesh);
                gltf.animations.forEach((clip) => {
                  mixer.clipAction(clip).play();
                });
              }
              
              if (!isMobile) {
                createHotspotAnchors();
              }
              
              console.log('Fallback chassis model loaded successfully');
            },
            undefined,
            function(fallbackError) {
              console.error('Error loading fallback chassis model:', fallbackError);
              // Last resort: show placeholder
              showPlaceholderCar();
            }
          );
        } else {
          // No fallback available, show placeholder
          showPlaceholderCar();
        }
      }
    );
  }
  
  // Create hotspot DOM elements
  function createHotspotElements() {
    HOTSPOT_DATA.forEach(data => {
      const element = document.createElement('div');
      element.className = 'car-hotspot';
      element.id = `hotspot-${data.id}`;
      
      // Get translated text
      const name = window.i18n ? window.i18n.t(data.nameKey) : data.nameKey;
      const description = window.i18n ? window.i18n.t(data.descriptionKey) : data.descriptionKey;
      
      element.innerHTML = `
        <div class="hotspot-arrow"></div>
        <div class="hotspot-content">
          <h4 data-i18n="${data.nameKey}">${name}</h4>
          <p data-i18n="${data.descriptionKey}">${description}</p>
        </div>
      `;
      element.style.position = 'absolute';
      element.style.display = 'none';
      element.style.pointerEvents = 'none';
      container.appendChild(element);
    });
  }
  
  // Create 3D hotspot anchors
  function createHotspotAnchors() {
    HOTSPOT_DATA.forEach(data => {
      const anchor = new THREE.Object3D();
      anchor.position.set(data.position.x, data.position.y, data.position.z);
      anchor.userData = {
        id: data.id,
        normal: new THREE.Vector3(data.normal.x, data.normal.y, data.normal.z),
        threshold: data.visibilityThreshold
      };
      carGroup.add(anchor);
      hotspots.push(anchor);
    });
  }
  
  // Update hotspot visibility and positions
  function updateHotspots() {
    if (isMobile || !carGroup) return;
    
    // Get camera direction
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    cameraDirection.normalize();
    
    // Calculate visibility for all hotspots
    const visibleHotspots = [];
    
    hotspots.forEach(anchor => {
      const element = document.getElementById(`hotspot-${anchor.userData.id}`);
      if (!element) return;
      
      // Get world position of anchor
      const worldPos = new THREE.Vector3();
      anchor.getWorldPosition(worldPos);
      
      // Transform normal to world space
      const worldNormal = anchor.userData.normal.clone();
      worldNormal.applyQuaternion(carGroup.quaternion);
      worldNormal.normalize();
      
      // Calculate dot product (cosine of angle between camera and normal)
      const dot = worldNormal.dot(cameraDirection.clone().multiplyScalar(-1));
      
      // Check if part is facing camera
      const isVisible = dot > anchor.userData.threshold;
      
      if (isVisible) {
        // Project 3D position to screen space
        const screenPos = worldPos.clone().project(camera);
        
        // Convert to pixel coordinates
        const rect = renderer.domElement.getBoundingClientRect();
        const x = (screenPos.x * 0.5 + 0.5) * rect.width;
        const y = (screenPos.y * -0.5 + 0.5) * rect.height;
        
        // Check if in viewport
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height && screenPos.z < 1) {
          visibleHotspots.push({
            element: element,
            anchor: anchor,
            dot: dot,
            x: x,
            y: y
          });
        } else {
          element.style.display = 'none';
        }
      } else {
        element.style.display = 'none';
      }
    });
    
    // Show only the most visible hotspot (highest dot product = most directly facing camera)
    if (visibleHotspots.length > 0) {
      // Sort by visibility (highest dot product first)
      visibleHotspots.sort((a, b) => b.dot - a.dot);
      
      // Show only the first (most visible) one
      const mostVisible = visibleHotspots[0];
      mostVisible.element.style.display = 'block';
      mostVisible.element.style.left = `${mostVisible.x}px`;
      mostVisible.element.style.top = `${mostVisible.y}px`;
      mostVisible.element.style.opacity = Math.min(1, mostVisible.dot * 2);
      
      // Hide all others
      for (let i = 1; i < visibleHotspots.length; i++) {
        visibleHotspots[i].element.style.display = 'none';
      }
    }
  }
  
  // Placeholder car if model fails to load
  function showPlaceholderCar() {
    carGroup = new THREE.Group();
    
    // Create simple car shape
    const bodyGeometry = new THREE.BoxGeometry(4, 1, 2);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: CONFIG.carModel.color,
      emissive: CONFIG.carModel.color,
      emissiveIntensity: 0.2,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.7
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    carGroup.add(body);
    
    // Add wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 16);
    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.7,
      roughness: 0.3
    });
    
    const wheelPositions = [
      [-1.5, 0, 0.8],
      [-1.5, 0, -0.8],
      [1.5, 0, 0.8],
      [1.5, 0, -0.8]
    ];
    
    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(...pos);
      carGroup.add(wheel);
    });
    
    carGroup.position.set(
      CONFIG.carModel.positionOffset.x,
      CONFIG.carModel.positionOffset.y,
      CONFIG.carModel.positionOffset.z
    );
    
    scene.add(carGroup);
    console.log('Placeholder car displayed');
  }
  
  // Setup user interaction (desktop only)
  function setupInteraction() {
    if (isMobile || !controls) return;
    
    let isUserInteracting = false;
    let interactionTimeout;
    
    const pauseAutoRotate = () => {
      isUserInteracting = true;
      controls.autoRotate = false;
      
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        isUserInteracting = false;
        controls.autoRotate = true;
      }, 3000);
    };
    
    // Mouse events
    renderer.domElement.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      pauseAutoRotate();
    });
    
    // Touch events
    renderer.domElement.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      pauseAutoRotate();
    });
    
    // Allow normal page scrolling - don't prevent wheel events
    // renderer.domElement.addEventListener('wheel', (e) => {
    //   e.preventDefault();
    //   e.stopPropagation();
    // }, { passive: false });
  }
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    
    // Update controls (if exist)
    if (controls) {
      controls.update();
    }
    
    // Animate wavy plane
    if (!isMobile || dotPlane.length < 2000) { // Skip on low-end mobile
      animateWavyPlane();
    }
    
    // Update mixer for model animations
    if (mixer) {
      mixer.update(delta);
    }
    
    // Update hotspots
    if (!isMobile) {
      updateHotspots();
    }
    
    // Render scene
    renderer.render(scene, camera);
  }
  
  // Handle window resize
  function onWindowResize() {
    const width = container.offsetWidth || window.innerWidth;
    const height = container.offsetHeight || window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
