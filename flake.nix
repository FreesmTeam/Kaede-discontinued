{
  description = "FreesmLauncher, but reloaded";

  inputs.nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.1.*.tar.gz";

  outputs =
    { self, nixpkgs }:
    let
      goVersion = 24;
      nodejsVersion = 23;

      supportedSystems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forEachSupportedSystem =
        f:
        nixpkgs.lib.genAttrs supportedSystems (
          system:
          f {
            pkgs = import nixpkgs {
              inherit system;
              overlays = [ self.overlays.default ];
            };
          }
        );
    in
    {
      overlays.default = final: prev: {
        go = final."go_1_${toString goVersion}";
        nodejs = final."nodejs_${toString nodejsVersion}";
      };

      devShells = forEachSupportedSystem (
        { pkgs }:
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              go
              gotools
              golangci-lint
              wails
              gtk3
              webkitgtk
              nsis
              upx
              docker
              gcc
              nodejs
              pkg-config
              bun
              typescript
              vite
            ];
          };
        }
      );
    };
}
