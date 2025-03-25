export interface InstallValue {
  duration: number,
  flexDiscount: number,
  price: number,
}

export interface InstallBundle {
  tires1: InstallValue,
  tires2: InstallValue,
  tires3: InstallValue,
  tires4: InstallValue,
}

export interface InstallOnly {
  tires4: InstallValue,
  tires5: InstallValue,
  tires6: InstallValue,
  tires8: InstallValue,
}

export interface Install {
  bundle: InstallBundle,
  installOnly: InstallOnly,
}

